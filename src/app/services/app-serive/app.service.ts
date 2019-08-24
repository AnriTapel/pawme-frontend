import { Injectable } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Data of logged-in entity
  userData: any = [1];

  // Dog entity parameters
  availCities = ["Абакан",	"Абдулино",	"Абинск",	"Автуры",	"Агидель",	"Агинское",	"Агрыз",	"Адыгейск",	"Азнакаево",	"Азов",	"Айхал",	"Ак-Довурак",	"Акбулак",	"Аксай",	"Алагир",	"Алапаевск",	"Алатырь",	"Алдан",	"Алейск",	"Александрийская",	"Александров",	"Александровск",	"Александровское",	"Алексеевка, Белгородская область",	"Алексеевка, Самарская область",	"Алексеевское",	"Алексин",	"Аллерой",	"Алтайское",	"Алушта",	"Алхан-Кала",	"Альбурикент",	"Альметьевск",	"Амурск",	"Анадырь",	"Анапа",	"Анапская",	"Анастасиевская",	"Ангарск",	"Андреевка",	"Анжеро-Судженск",	"Анна",	"Апатиты",	"Апрелевка",	"Апшеронск",	"Арамиль",	"Аргаяш",	"Аргун",	"Ардон",	"Арзамас",	"Арзгир",	"Аркадак",	"Армавир",	"Армянск",	"Арсеньев",	"Арск",	"Артём",	"Артёмовский",	"Арти",	"Архангельск",	"Асбест",	"Асино",	"Ассиновская",	"Астрахань",	"Атамановка",	"Аткарск",	"Афипский",	"Ахтубинск",	"Ахты",	"Ахтырский",	"Ачинск",	"Ачхой-Мартан",	"Аша",	"Бабаево",	"Бабаюрт",	"Бавлы",	"Багаевская",	"Байкальск",	"Баймак",	"Бакал",	"Баксан",	"Балабаново",	"Балаково",	"Балахна",	"Балашиха",	"Балашов",	"Балезино",	"Балей",	"Балтийск",	"Барабинск",	"Барнаул",	"Барсуки",	"Барыш",	"Батайск",	"Бахчисарай",	"Бачатский",	"Бачи-Юрт",	"Башмаково",	"Бежецк",	"Безенчук",	"Белая Глина",	"Белая Калитва",	"Белая Холуница",	"Белгород",	"Белебей",	"Белёв",	"Белиджи",	"Белово",	"Белогорск, Амурская область",	"Белогорск, Республика Крым",	"Белокуриха",	"Беломорск",	"Белоозёрский",	"Белорецк",	"Белореченск",	"Белоярский, Свердловская область",	"Белоярский, Югра",	"Белый Яр, Республика Хакасия",	"Белый Яр, Югра",	"Бердск",	"Березники",	"Берёзовка",	"Берёзовский, Кемеровская область",	"Берёзовский, Свердловская область",	"Беслан",	"Бессоновка",	"Бийск",	"Бикин",	"Биробиджан",	"Бирск",	"Благовещенка",	"Благовещенск, Амурская область",	"Благовещенск, Республика Башкортостан",	"Благодарный",	"Бобров",	"Богандинский",	"Богданович",	"Богородицк",	"Богородск",	"Боготол",	"Богучаны",	"Богучар",	"Бодайбо",	"Бокситогорск",	"Бологое",	"Болотное",	"Болхов",	"Большеречье",	"Большие Вязёмы",	"Большой Камень",	"Бор",	"Борзя",	"Борисовка",	"Борисоглебск",	"Боровичи",	"Боровск",	"Боровский",	"Бородино",	"Ботлих",	"Братск",	"Бронницы",	"Брюховецкая",	"Брянск",	"Бугульма",	"Бугуруслан",	"Будённовск",	"Буздяк",	"Бузулук",	"Буинск",	"Буй",	"Буйнакск",	"Буланаш",	"Бутурлиновка",	"Быково",	"Валдай",	"Валуйки",	"Ванино",	"Варениковская",	"Васильево",	"Васюринская",	"Великие Луки",	"Великий Новгород",	"Великий Устюг",	"Вельск",	"Венёв",	"Верещагино",	"Верхнеднепровский",	"Верхний Тагил",	"Верхний Уфалей",	"Верхняя Пышма",	"Верхняя Салда",	"Верхняя Синячиха",	"Ветлужский",	"Видное",	"Вилюйск",	"Вилючинск",	"Винзили",	"Витязево",	"Вихоревка",	"Вичуга",	"Владивосток",	"Владикавказ",	"Владимир",	"Власиха",	"Волгоград",	"Волгодонск",	"Волгореченск",	"Волжск",	"Волжский",	"Вологда",	"Володарск",	"Володарский",	"Волоколамск",	"Волоконовка",	"Волосово",	"Волхов",	"Волчиха",	"Вольск",	"Воргашор",	"Воркута",	"Воронеж",	"Воротынск",	"Ворсма",	"Воскресенск",	"Воткинск",	"Всеволожск",	"Вуктыл",	"Вурнары",	"Выборг",	"Выкса",	"Выльгорт",	"Вырица",	"Выселки",	"Высоковск",	"Вытегра",	"Вычегодский",	"Вышний Волочёк",	"Вяземский",	"Вязники",	"Вязьма",	"Вятские Поляны",	"Гаврилов-Ям",	"Гагарин",	"Гаджиево",	"Гай",	"Галич",	"Гаспра",	"Гатчина",	"Гвардейск",	"Гвардейское",	"Гелдагана",	"Геленджик",	"Георгиевск",	"Герменчук",	"Гехи",	"Гиагинская",	"Гигант",	"Глазов",	"Глебовский",	"Гойты",	"Голицыно",	"Голышманово",	"Горно-Алтайск",	"Горнозаводск",	"Горный",	"Горняк",	"Городец",	"Городище",	"Гороховец",	"Горячеводский",	"Горячий Ключ",	"Гостагаевская",	"Грамотеино",	"Грибановский",	"Грозный",	"Грязи",	"Грязовец",	"Губаха",	"Губкин",	"Губкинский",	"Гудермес",	"Гуково",	"Гулькевичи",	"Гурьевск, Калининградская область",	"Гурьевск, Кемеровская область",	"Гусев",	"Гусиноозёрск",	"Гусь-Хрустальный",	"Давлеканово",	"Давыдово",	"Дагестанские Огни",	"Далматово",	"Дальнегорск",	"Дальнереченск",	"Данилов",	"Данков",	"Дегтярск",	"Дедовск",	"Дербент",	"Десногорск",	"Джалиль",	"Джанкой",	"Дзержинск",	"Дзержинский",	"Дивногорск",	"Дивное",	"Дигора",	"Димитровград",	"Динская",	"Дмитров",	"Добрянка",	"Долгопрудный",	"Долинск",	"Домодедово",	"Донецк",	"Донское",	"Донской",	"Дорогобуж",	"Дрезна",	"Дубна",	"Дубовка",	"Дудинка",	"Дыгулыбгей",	"Дюртюли",	"Дятьково",	"Евпатория",	"Егорлыкская",	"Егорьевск",	"Ейск",	"Екатеринбург",	"Елабуга",	"Еланский",	"Елань",	"Елец",	"Елизаветинская",	"Елизово",	"Еманжелинск",	"Емва",	"Емельяново",	"Енисейск",	"Ермолино",	"Ершов",	"Ессентуки",	"Ессентукская",	"Ефремов",	"Железноводск",	"Железногорск-Илимский",	"Железногорск, Красноярский край",	"Железногорск, Курская область",	"Жердевка",	"Жигулёвск",	"Жирновск",	"Жуков",	"Жуковка",	"Жуковский",	"Забайкальск",	"Завитинск",	"Заводоуковск",	"Заводской",	"Заволжск",	"Заволжье",	"Завьялово",	"Заинск",	"Закаменск",	"Заозерный",	"Заполярный",	"Запрудня",	"Зарайск",	"Заречный, Пензенская область",	"Заречный, Свердловская область",	"Заринск",	"Заюково",	"Звенигово",	"Звенигород",	"Зверево",	"Зеленогорск",	"Зеленоградск",	"Зеленодольск",	"Зеленокумск",	"Зеленчукская",	"Зерноград",	"Зея",	"Зима",	"Зимовники",	"Златоуст",	"Змеиногорск",	"Знаменка",	"Знаменск",	"Знаменское",	"Зольская",	"Зубова Поляна",	"Зуевка",	"Ивангород",	"Иваново",	"Ивановская",	"Ивантеевка",	"Ивдель",	"Иглино",	"Игра",	"Ижевск",	"Избербаш",	"Излучинск",	"Изобильный",	"Икряное",	"Иланский",	"Илек",	"Иловля",	"Ильинский",	"Ильский",	"Инза",	"Иноземцево",	"Инской",	"Инта",	"Ипатово",	"Ирбит",	"Иркутск",	"Исилькуль",	"Искитим",	"Исламей",	"Истра",	"Ишеевка",	"Ишим",	"Ишимбай",	"Йошкар-Ола",	"Каа-Хем",	"Кавалерово",	"Кавказская",	"Кадуй",	"Казанская",	"Казань",	"Калач",	"Калач-на-Дону",	"Калачинск",	"Калининград",	"Калининец",	"Калининск",	"Калининская",	"Калтан",	"Калуга",	"Калязин",	"Камбарка",	"Каменка",	"Каменоломни",	"Каменск-Уральский",	"Каменск-Шахтинский",	"Камень-на-Оби",	"Камень-Рыболов",	"Камешково",	"Камские Поляны",	"Камызяк",	"Камышин",	"Камышлов",	"Канаш",	"Кандалакша",	"Кандры",	"Каневская",	"Канск",	"Кантемировка",	"Кантышево",	"Карабаново",	"Карабаш",	"Карабудахкент",	"Карабулак",	"Карасук",	"Карачаевск",	"Карачев",	"Каргополь",	"Карпинск",	"Карталы",	"Карымское",	"Касимов",	"Касли",	"Каспийск",	"Касумкент",	"Катав-Ивановск",	"Катайск",	"Катыр-Юрт",	"Качканар",	"Кашин",	"Кашира",	"Каякент",	"Кез",	"Кемерово",	"Кемь",	"Керчь",	"Киевское",	"Кизел",	"Кизилюрт",	"Кизляр, Республика Дагестан",	"Кизляр, Республика Северная Осетия - Алания",	"Кизнер",	"Кимовск",	"Кимры",	"Кингисепп",	"Кинель",	"Кинель-Черкассы",	"Кинешма",	"Киреевск",	"Киренск",	"Киржач",	"Кириши",	"Киров, Калужская область",	"Киров, Кировская область",	"Кировград",	"Кирово-Чепецк",	"Кировск, Ленинградская область",	"Кировск, Мурманская область",	"Кирсанов",	"Киселёвск",	"Кисловодск",	"Клетня",	"Климово",	"Клин",	"Клинцы",	"Ковдор",	"Ковров",	"Ковылкино",	"Когалым",	"Кодинск",	"Козельск",	"Козьмодемьянск",	"Коломна",	"Колпашево",	"Колывань",	"Кольцово",	"Кольчугино",	"Коммунар",	"Комсомольск-на-Амуре",	"Комсомольский",	"Конаково",	"Кондопога",	"Кондратово",	"Кондрово",	"Коноша",	"Константиновск",	"Копейск",	"Кораблино",	"Кореновск",	"Коркино",	"Королёв",	"Корсаков",	"Коряжма",	"Костомукша",	"Кострома",	"Котельники",	"Котельниково",	"Котельнич",	"Котлас",	"Котово",	"Котовск",	"Кохма",	"Коченёво",	"Кочубеевское",	"Красково",	"Красноармейск, Московская область",	"Красноармейск, Саратовская область",	"Краснобродский",	"Красновишерск",	"Красногвардейское, Республика Крым",	"Красногвардейское, Ставропольский край",	"Красногорск",	"Красногорский",	"Краснодар",	"Краснозаводск",	"Краснознаменск",	"Краснокаменск",	"Краснокамск",	"Краснокумское",	"Краснообск",	"Красноперекопск",	"Краснослободск",	"Краснотурьинск",	"Красноуральск",	"Красноусольский",	"Красноуфимск",	"Красноярск",	"Красный Кут",	"Красный Сулин",	"Красный Яр",	"Кремёнки",	"Криводановка",	"Кривянская",	"Кропоткин",	"Крыловская",	"Крымск",	"Кстово",	"Кубинка",	"Кувандык",	"Кугеси",	"Кудымкар",	"Кузнецк",	"Куйбышев",	"Кукмор",	"Кулебаки",	"Кулешовка",	"Кулунда",	"Кумертау",	"Кунгур",	"Купино",	"Курагино",	"Курган",	"Курганинск",	"Куровское",	"Курсавка",	"Курск",	"Курская",	"Куртамыш",	"Курчалой",	"Курчатов",	"Куса",	"Кушва",	"Кущёвская",	"Кызыл",	"Кыштым",	"Кяхта",	"Лабинск",	"Лабытнанги",	"Лагань",	"Ладожская",	"Лакинск",	"Лангепас",	"Лебедянь",	"Леваши",	"Левокумское",	"Ленинградская",	"Ленинкент",	"Лениногорск",	"Ленинск",	"Ленинск-Кузнецкий",	"Ленск",	"Лермонтов",	"Лесной",	"Лесозаводск",	"Лесосибирск",	"Ливны",	"Ликино-Дулёво",	"Линёво",	"Липецк",	"Лиски",	"Лихославль",	"Лобня",	"Лодейное Поле",	"Лосино-Петровский",	"Луга",	"Луза",	"Лукоянов",	"Луховицы",	"Лучегорск",	"Лысково",	"Лысогорская",	"Лысьва",	"Лыткарино",	"Льгов",	"Люберцы",	"Любинский",	"Людиново",	"Лянтор",	"Магадан",	"Магдагачи",	"Магнитогорск",	"Майкоп",	"Майма",	"Майртуп",	"Майский",	"Малаховка",	"Малая Вишера",	"Малгобек",	"Малоярославец",	"Мамадыш",	"Мамедкала",	"Мантурово",	"Мариинск",	"Маркова",	"Маркс",	"Марьянская",	"Маслянино",	"Матвеев Курган",	"Махачкала",	"Мга",	"Мегион",	"Медведево",	"Медведовская",	"Медвежьегорск",	"Медногорск",	"Межгорье",	"Междуреченск",	"Междуреченский",	"Меленки",	"Мелеуз",	"Менделеевск",	"Мензелинск",	"Мескер-Юрт",	"Месягутово",	"Миасс",	"Миллерово",	"Минеральные Воды",	"Минусинск",	"Мирный, Архангельская область",	"Мирный, Республика Саха",	"Михайлов",	"Михайловка",	"Михайловск",	"Михайловская",	"Михайловское",	"Михнево",	"Мичуринск",	"Могойтуй",	"Могоча",	"Можайск",	"Можга",	"Моздок",	"Мокшан",	"Монино",	"Мончегорск",	"Морозовск",	"Моршанск",	"Москва",	"Мостовской",	"Муравленко",	"Мурманск",	"Мурмаши",	"Муром",	"Муромцево",	"Мценск",	"Мыски",	"Мытищи",	"Набережные Челны",	"Навашино",	"Навля",	"Надежда",	"Надым",	"Назарово",	"Назрань",	"Называевск",	"Нальчик",	"Нариманов",	
      "Наро-Фоминск",	"Нартан",	"Нарткала",	"Нарышкино",	"Нарьян-Мар",	"Нахабино",	"Находка",	"Невель",	"Невельск",	"Невинномысск",	"Невьянск",	"Незлобная",	"Некрасовский",	"Нелидово",	"Неман",	"Нерехта",	"Нерчинск",	"Нерюнгри",	"Нестеровская",	"Нефтегорск",	"Нефтекамск",	"Нефтекумск",	"Нефтеюганск",	"Нижневартовск",	"Нижнее Казанище",	"Нижнекамск",	"Нижнесортымский",	"Нижнеудинск",	"Нижний Ломов",	"Нижний Новгород",	"Нижний Тагил",	"Нижняя Мактама",	"Нижняя Салда",	"Нижняя Тура",	"Никель",	"Николаевск",	"Николаевск-на-Амуре",	"Никольск",	"Никольское",	"Новая Ляля",	"Новая Усмань",	"Новоалександровск",	"Новоалтайск",	"Новоаннинский",	"Нововеличковская",	"Нововоронеж",	"Новодвинск",	"Новое Девяткино",	"Новозыбков",	"Новокручининский",	"Новокубанск",	"Новокузнецк",	"Новокуйбышевск",	"Новоминская",	"Новомихайловский",	"Новомичуринск",	"Новомосковск",	"Новомышастовская",	"Новоорск",	"Новопавловск",	"Новопокровская",	"Новороссийск",	"Новосергиевка",	"Новосибирск",	"Новоспасское",	"Новотитаровская",	"Новотроицк",	"Новоузенск",	"Новоульяновск",	"Новоуральск",	"Новочебоксарск",	"Новочеркасск",	"Новошахтинск",	"Новый Городок, Кемеровская область",	"Новый городок, Московская область",	"Новый Кяхулай",	"Новый Оскол",	"Новый Уренгой",	"Новый Хушет",	"Ногинск",	"Ногир",	"Норильск",	"Ноябрьск",	"Нурлат",	"Нытва",	"Нягань",	"Нязепетровск",	"Няндома",	"Обливская",	"Обнинск",	"Обоянь",	"Обухово",	"Обь",	"Одинцово",	"Озёрный",	"Озёрск",	"Озёры",	"Ойсхара",	"Октябрьск",	"Октябрьская",	"Октябрьский, Московская область",	"Октябрьский, Республика Башкортостан",	"Октябрьское, Республика Крым",	"Октябрьское, Республика Северная Осетия - Алания",	"Окуловка",	"Оленегорск",	"Омск",	"Омутнинск",	"Онега",	"Онохой",	"Опочка",	"Орёл",	"Оренбург",	"Орехово-Зуево",	"Орловский",	"Орск",	"Оса",	"Осинники",	"Осташков",	"Остров",	"Острогожск",	"Отрадная",	"Отрадное",	"Отрадный",	"Оха",	"Очёр",	"Павлово",	"Павловск, Алтайский край",	"Павловск, Воронежская область",	"Павловская",	"Павловский Посад",	"Палласовка",	"Пангоды",	"Партизанск",	"Пенза",	"Первомайск",	"Первомайский, Забайкальский край",	"Первомайский, Тамбовская область",	"Первомайский, Челябинская область",	"Первоуральск",	"Пересвет",	"Переславль-Залесский",	"Пермь",	"Персиановский",	"Пестово",	"Песчанокопское",	"Петров Вал",	"Петровск",	"Петровск-Забайкальский",	"Петровская",	"Петрозаводск",	"Петропавловск-Камчатский",	"Петухово",	"Петушки",	"Печора",	"Печоры",	"Пикалёво",	"Пионерский",	"Питкяранта",	"Плавск",	"Пласт",	"Пластуновская",	"Платнировская",	"Плесецк",	"Плиево",	"Поворино",	"Пограничный",	"Подольск",	"Подпорожье",	"Пойковский",	"Покачи",	"Покров",	"Покровка",	"Покровское",	"Полазна",	"Полевской",	"Полтавская",	"Полысаево",	"Полярные Зори",	"Полярный",	"Поронайск",	"Посёлок имени Морозова",	"Поспелиха",	"Похвистнево",	"Почеп",	"Правдинский",	"Прасковея",	"Приволжск",	"Приволжский",	"Приморский",	"Приморско-Ахтарск",	"Приозерск",	"Приютово",	"Прогресс",	"Прокопьевск",	"Пролетарск",	"Промышленная",	"Протвино",	"Прохладный",	"Псебай",	"Псков",	"Пугачёв",	"Пушкино",	"Пущино",	"Пыть-Ях",	"Пышма",	"Пятигорск",	"Радужный, Владимирская область",	"Радужный, Югра",	"Раевский",	"Развилка",	"Разумное",	"Райчихинск",	"Ракитное",	"Раменское",	"Рассказово",	"Ревда",	"Редкино",	"Реж",	"Реутов",	"Рефтинский",	"Ржев",	"Ровеньки",	"Родники",	"Роза",	"Рославль",	"Россошь",	"Ростов",	"Ростов-на-Дону",	"Рошаль",	"Рощино",	"Рощинский",	"Ртищево",	"Рубцовск",	"Руза",	"Рузаевка",	"Рыбинск",	"Рыбное",	"Рыльск",	"Ряжск",	"Рязань",	"Сагопши",	"Саки",	"Салават",	"Салехард",	"Сальск",	"Самара",	"Самарское",	"Самашки",	"Санкт-Петербург",	"Саракташ",	"Саранск",	"Сарапул",	"Саратов",	"Саров",	"Сасово",	"Сатка",	"Сафоново",	"Саяногорск",	"Саянск",	"Светлогорск",	"Светлоград",	"Светлый Яр",	"Светлый, Калининградская область",	"Светлый, Саратовская область",	"Светогорск",	"Свирск",	"Свободный",	"Свободы",	"Севастополь",	"Северный",	"Северобайкальск",	"Северодвинск",	"Североморск",	"Североуральск",	"Северск",	"Северская",	"Сегежа",	"Селенгинск",	"Сельцо",	"Селятино",	"Семендер",	"Семёнов",	"Семикаракорск",	"Семилуки",	"Сергач",	"Сергиев Посад",	"Сердобск",	"Серноводская",	"Серов",	"Серпухов",	"Сертолово",	"Сибай",	"Сибирский",	"Сиверский",	"Сим",	"Симферополь",	"Скопин",	"Славгород",	"Славянка",	"Славянск-на-Кубани",	"Сланцы",	"Слободской",	"Слюдянка",	"Смоленск",	"Снежинск",	"Снежногорск",	"Собинка",	"Советск, Калининградская область",	"Советск, Кировская область",	"Советская Гавань",	"Советский, Республика Крым",	"Советский, Республика Марий Эл",	"Советский, Югра",	"Сокол",	"Соликамск",	"Солнечногорск",	"Солнечнодольск",	"Солнечный, Хабаровский край",	"Солнечный, Югра",	"Соль-Илецк",	"Сорочинск",	"Сорск",	"Сортавала",	"Сосенский",	"Сосновка",	"Сосновоборск",	"Сосновый Бор",	"Сосногорск",	"Софрино",	"Сочи",	"Спасск-Дальний",	"Среднеуральск",	"Средняя Ахтуба",	"Ставрополь",	"Старая Купавна",	"Старая Русса",	"Старовеличковская",	"Стародеревянковская",	"Стародуб",	"Староминская",	"Старомышастовская",	"Старонижестеблиевская",	"Старотитаровская",	"Старощербиновская",	"Старые Атаги",	"Старый Оскол",	"Степное",	"Стерлитамак",	"Сторожевая",	"Стрежевой",	"Строитель, Белгородская область",	"Строитель, Тамбовская область",	"Струнино",	"Ступино",	"Суворов",	"Суворовская",	"Судак",	"Судогда",	"Сузун",	"Сунжа",	"Сураж",	"Сургут",	"Суровикино",	"Сурхахи",	"Сухиничи",	"Суходол",	"Сухой Лог",	"Сызрань",	"Сыктывкар",	"Сысерть",	"Сясьстрой",	"Тавда",	"Таврическое",	"Таганрог",	"Тайга",	"Тайшет",	"Талдом",	"Талица",	"Таловая",	"Тальменка",	"Тамань",	"Тамбов",	"Тара",	"Тарки",	"Тарко-Сале",	"Татарск",	"Таштагол",	"Тбилисская",	"Тверь",	"Тейково",	"Темрюк",	"Терек",	"Тетюши",	"Тимашёвск",	"Тихвин",	"Тихорецк",	"Тобольск",	"Товарково",	"Тогучин",	"Толбазы",	"Тольятти",	"Томилино",	"Томск",	"Топки",	"Торжок",	"Торопец",	"Тосно",	"Тоцкое Второе",	"Трёхгорный",	"Троицк",	"Троицкая",	"Троицкий",	"Троицкое",	"Трубчевск",	"Трудобеликовский",	"Трудовое",	"Туапсе",	"Туймазы",	"Тула",	"Тулун",	"Тульский",	"Туринск",	"Тутаев",	"Тучково",	"Тында",	"Тырныауз",	"Тюкалинск",	"Тюмень",	"Тяжинский",	"Ува",	"Уварово",	"Углич",	"Удачный",	"Удельная",	"Удомля",	"Ужур",	"Узловая",	"Улан-Удэ",	"Ульяновка",	"Ульяновск",	"Унеча",	"Урай",	"Уренгой",	"Урень",	"Урус-Мартан",	"Уруссу",	"Урюпинск",	"Усинск",	"Усмань",	"Усолье-Сибирское",	"Успенское",	"Уссурийск",	"Усть-Абакан",	"Усть-Джегута",	"Усть-Донецкий",	"Усть-Илимск",	"Усть-Катав",	"Усть-Кинельский",	"Усть-Кут",	"Усть-Лабинск",	"Усть-Ордынский",	"Уфа",	"Ухта",	"Учалы",	"Учкекен",	"Уяр",	"Фёдоровский",	"Феодосия",	"Фокино, Брянская область",	"Фокино, Приморский край",	"Фролово",	"Фрязино",	"Фряново",	"Фурманов",	"Хабаровск",	"Хадыженск",	"Ханская",	"Ханты-Мансийск",	"Харабали",	"Хасавюрт",	"Хасанья",	"Хвалынск",	"Хилок",	"Химки",	"Холмск",	"Холмская",	"Хороль",	"Хотьково",	"Целина",	"Цивильск",	"Цимлянск",	"Цоци-Юрт",	"Чайковский",	"Чалтырь",	"Чапаевск",	"Чаплыгин",	"Чебаркуль",	"Чебоксары",	"Чегдомын",	"Чегем",	"Чегем Второй",	"Чекмагуш",	"Челябинск",	"Червлённая",	"Чердаклы",	"Черемхово",	"Черепаново",	"Череповец",	"Черкесск",	"Черлак",	"Черниговка",	"Черноголовка",	"Черногорск",	"Черноморское",	"Чернушка",	"Чернышевск",	"Чернянка",	"Черняховск",	"Чертково",	"Чехов",	"Чистополь",	"Чита",	"Чишмы",	"Чкаловск",	"Чугуевка",	"Чудово",	"Чулым",	"Чунский",	"Чусовой",	"Шагонар",	"Шадринск",	"Шали",	"Шалушка",	"Шамхал",	"Шамхал-Термен",	"Шарыпово",	"Шарья",	"Шатура",	"Шаховская",	"Шахты",	"Шахунья",	"Шебекино",	"Шексна",	"Шелехов",	"Шелковская",	"Шерегеш",	"Шерловая Гора",	"Шилка",	"Шилово",	"Шимановск",	"Шипуново",	"Шира",	"Шлиссельбург",	"Шумерля",	"Шумиха",	"Шушенское",	"Шуя",	"Щёкино",	"Щёлкино",	"Щёлково",	"Щигры",	"Щучье",	"Экажево",	"Электрогорск",	"Электросталь",	"Электроугли",	"Элиста",	"Эльбан",	"Эльхотово",	"Энгельс",	"Энем",	"Эртиль",	"Югорск",	"Южа",	"Южно-Сахалинск",	"Южно-Сухокумск",	"Южноуральск",	"Южный",	"Юрга",	"Юрьев-Польский",	"Юрюзань",	"Юца",	"Яблоновский",	"Яйва",	"Якутск",	"Ялта",	"Ялуторовск",	"Янаул",	"Яранск",	"Яровое",	"Ярославль",	"Ярцево",	"Ясногорск",	"Ясный",	"Яхрома",	"Яшкино",	"Яя"];
  availBreeds = ["Австралийская овчарка ",	"Австралийский келпи",	"Австралийский шелковистый терьер",	"Аляскинский кли-кай",	"Аляскинский маламут",	"Американская акита",	"Американский бульдог",	"Американский голый терьер",	"Американский кокер-спаниель",	"Американский питбультерьер",	"Американский стаффордширский терьер",	"Американский эскимосский шпиц",	"Английский бульдог",	"Английский кокер-спаниель",	"Английский мастиф",	"Английский сеттер",	"Английский спрингер-спаниель",	"Аргентинский дог",	"Афганская борзая",	"Аффенпинчер",	"Басенджи",	"Бассет-хаунд",	"Бедлингтон-терьер",	"Белая швейцарская овчарка",	"Бельгийская овчарка",	"Бивер-йорк",	"Бигль",	"Бишон фризе",	"Бобтейл",	"Боксер",	"Бордер-колли",	"Бордер-терьер",	"Бордосский дог",	"Бородатый колли",	"Бостон-терьер",	"Брюссельский гриффон",	"Бульмастиф",	"Бультерьер",	"Веймаранер",	"Вельш-корги",	"Вельштерьер",	"Венгерская выжла",	"Венгерский кувас",	"Вест-хайленд-уайт-терьер",	"Волкособ",	"Восточно-европейская овчарка",	"Восточносибирская лайка",	"Горная пиренейская собака",	"Грейхаунд",	"Далматинец",	"Джек-рассел-терьер",	"Доберман",	"Дратхаар",	"Евразиер",	"Западно-сибирская лайка",	"Золотистый ретривер ",	"Ирландский волкодав",	"Ирландский мягкошерстный пшеничный терьер",	"Ирландский сеттер",	"Ирландский терьер",	"Итальянская болонка",	"Итальянская борзая",	"Йоркширский терьер ",	"Кадебо",	"Кавалер-кинг-чарльз-спаниель",	"Кавказская овчарка",	"Калмыцкая пастушья собака барг",	"Кане-корсо",	"Карело-финская лайка",	"Карельская медвежья",	"Кеесхонд ",	"Керн-терьер",	"Керри-блю-терьер",	"Кисю",	"Китайская хохлатая",	"Колли ",	"Комондор ",	"Континентальный той-спаниель ",	"Курцхаар",	"Лабрадор ретривер",	"Леонбергер",	"Мальтийская болонка",	"Мастино наполетано",	"Мексиканская голая собака ",	"Миттельшнауцер",	"Мопс",	"Московская сторожевая",	"Немецкая овчарка",	"Немецкий дог",	"Немецкий ягдтерьер",	"Новошотландский ретривер ",	"Норвич-терьер",	"Ньюфаундленд",	"Пекинес",	"Пойнтер",	"Польская подгалянская овчарка",	"Померанский шпиц",	"Пти брабансон",	"Пудель",	"Пуми",	"Ризеншнауцер",	"Родезийский риджбек",	"Ротвейлер",	"Русская пегая гончая",	"Русская псовая борзая",	"Русская салонная собака ",	"Русский охотничий спаниель",	"Русский той-терьер",	"Русский черный терьер",	"Самоедская лайка",	"Сенбернар",	"Сиба-ину",	"Силихем-терьер",	"Скай-терьер",	"Скотч-терьер",	"Среднеазиатская овчарка ",	"Стаффордширский бультерьер",	"Тайский риджбек",	"Такса",	"Тибетский мастиф",	"Тоса-ину",	"Турецкий кангал",	"Уиппет",	"Фараонова собака",	"Фокстерьер",	"Французский бульдог",	"Хаски",	"Ховаварт",	"Хоккайдо",	"Цвергпинчер",	"Цвергшнауцер",	"Чау-чау",	"Чесапик-бей-ретривер",	"Чехословацкая волчья ",	"Чихуахуа",	"Шарпей",	"Шведский вальхунд",	"Шведский лаппхунд",	"Швейцарский зенненхунд",	"Шелти",	"Ши-тцу",	"Шипперке",	"Шотландский сеттер",	"Эрдельтерьер",	"Эстонская гончая",	"Южноафриканский бурбуль",	"Южнорусская овчарка",	"Японская акита-ину",	"Японский хин",];
  availBodyParts: string[] = ["Голова", "Туловище", "Уши", "Передние лапы", "Задние лапы", "То самое", "Кости", "Хвост"];
  availMedicalTests: string[] = ["МРТ", "ЭКГ", "ФСБ", "ПТУ", "ПВА", "МГУ", "ЛГБТ", "ГИБДД", "ТНТ"];

  constructor() { }

  fieldAutocomplite(searchArray: string[], focus$: Subject<string>, click$: Subject<string>, instance: NgbTypeahead): (text$: Observable<string>) => Observable<any[]> {
    return (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = click$.pipe(filter(() => instance.isPopupOpen()));
      const inputFocus$ = focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? searchArray
          : searchArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    }

  }
}
