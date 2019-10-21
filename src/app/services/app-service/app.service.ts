import { Injectable, Injector } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PuppyTest } from 'src/app/model/puppyTest';
import { BreederControllerService } from 'src/app/api/api';
import { Router } from '@angular/router';
import { NotificationBarService } from '../nofitication-service/notification-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Current user info
  userData: any = null;
  meData: any = null;

  // Dog entity parameters
  cities: Array<string> = ["Абакан", "Абдулино", "Абинск", "Автуры", "Агидель", "Агинское", "Агрыз", "Адыгейск", "Азнакаево", "Азов", "Айхал", "Ак-Довурак", "Акбулак", "Аксай", "Алагир", "Алапаевск", "Алатырь", "Алдан", "Алейск", "Александрийская", "Александров", "Александровск", "Александровское", "Алексеевка, Белгородская область", "Алексеевка, Самарская область", "Алексеевское", "Алексин", "Аллерой", "Алтайское", "Алушта", "Алхан-Кала", "Альбурикент", "Альметьевск", "Амурск", "Анадырь", "Анапа", "Анапская", "Анастасиевская", "Ангарск", "Андреевка", "Анжеро-Судженск", "Анна", "Апатиты", "Апрелевка", "Апшеронск", "Арамиль", "Аргаяш", "Аргун", "Ардон", "Арзамас", "Арзгир", "Аркадак", "Армавир", "Армянск", "Арсеньев", "Арск", "Артём", "Артёмовский", "Арти", "Архангельск", "Асбест", "Асино", "Ассиновская", "Астрахань", "Атамановка", "Аткарск", "Афипский", "Ахтубинск", "Ахты", "Ахтырский", "Ачинск", "Ачхой-Мартан", "Аша", "Бабаево", "Бабаюрт", "Бавлы", "Багаевская", "Байкальск", "Баймак", "Бакал", "Баксан", "Балабаново", "Балаково", "Балахна", "Балашиха", "Балашов", "Балезино", "Балей", "Балтийск", "Барабинск", "Барнаул", "Барсуки", "Барыш", "Батайск", "Бахчисарай", "Бачатский", "Бачи-Юрт", "Башмаково", "Бежецк", "Безенчук", "Белая Глина", "Белая Калитва", "Белая Холуница", "Белгород", "Белебей", "Белёв", "Белиджи", "Белово", "Белогорск, Амурская область", "Белогорск, Республика Крым", "Белокуриха", "Беломорск", "Белоозёрский", "Белорецк", "Белореченск", "Белоярский, Свердловская область", "Белоярский, Югра", "Белый Яр, Республика Хакасия", "Белый Яр, Югра", "Бердск", "Березники", "Берёзовка", "Берёзовский, Кемеровская область", "Берёзовский, Свердловская область", "Беслан", "Бессоновка", "Бийск", "Бикин", "Биробиджан", "Бирск", "Благовещенка", "Благовещенск, Амурская область", "Благовещенск, Республика Башкортостан", "Благодарный", "Бобров", "Богандинский", "Богданович", "Богородицк", "Богородск", "Боготол", "Богучаны", "Богучар", "Бодайбо", "Бокситогорск", "Бологое", "Болотное", "Болхов", "Большеречье", "Большие Вязёмы", "Большой Камень", "Бор", "Борзя", "Борисовка", "Борисоглебск", "Боровичи", "Боровск", "Боровский", "Бородино", "Ботлих", "Братск", "Бронницы", "Брюховецкая", "Брянск", "Бугульма", "Бугуруслан", "Будённовск", "Буздяк", "Бузулук", "Буинск", "Буй", "Буйнакск", "Буланаш", "Бутурлиновка", "Быково", "Валдай", "Валуйки", "Ванино", "Варениковская", "Васильево", "Васюринская", "Великие Луки", "Великий Новгород", "Великий Устюг", "Вельск", "Венёв", "Верещагино", "Верхнеднепровский", "Верхний Тагил", "Верхний Уфалей", "Верхняя Пышма", "Верхняя Салда", "Верхняя Синячиха", "Ветлужский", "Видное", "Вилюйск", "Вилючинск", "Винзили", "Витязево", "Вихоревка", "Вичуга", "Владивосток", "Владикавказ", "Владимир", "Власиха", "Волгоград", "Волгодонск", "Волгореченск", "Волжск", "Волжский", "Вологда", "Володарск", "Володарский", "Волоколамск", "Волоконовка", "Волосово", "Волхов", "Волчиха", "Вольск", "Воргашор", "Воркута", "Воронеж", "Воротынск", "Ворсма", "Воскресенск", "Воткинск", "Всеволожск", "Вуктыл", "Вурнары", "Выборг", "Выкса", "Выльгорт", "Вырица", "Выселки", "Высоковск", "Вытегра", "Вычегодский", "Вышний Волочёк", "Вяземский", "Вязники", "Вязьма", "Вятские Поляны", "Гаврилов-Ям", "Гагарин", "Гаджиево", "Гай", "Галич", "Гаспра", "Гатчина", "Гвардейск", "Гвардейское", "Гелдагана", "Геленджик", "Георгиевск", "Герменчук", "Гехи", "Гиагинская", "Гигант", "Глазов", "Глебовский", "Гойты", "Голицыно", "Голышманово", "Горно-Алтайск", "Горнозаводск", "Горный", "Горняк", "Городец", "Городище", "Гороховец", "Горячеводский", "Горячий Ключ", "Гостагаевская", "Грамотеино", "Грибановский", "Грозный", "Грязи", "Грязовец", "Губаха", "Губкин", "Губкинский", "Гудермес", "Гуково", "Гулькевичи", "Гурьевск, Калининградская область", "Гурьевск, Кемеровская область", "Гусев", "Гусиноозёрск", "Гусь-Хрустальный", "Давлеканово", "Давыдово", "Дагестанские Огни", "Далматово", "Дальнегорск", "Дальнереченск", "Данилов", "Данков", "Дегтярск", "Дедовск", "Дербент", "Десногорск", "Джалиль", "Джанкой", "Дзержинск", "Дзержинский", "Дивногорск", "Дивное", "Дигора", "Димитровград", "Динская", "Дмитров", "Добрянка", "Долгопрудный", "Долинск", "Домодедово", "Донецк", "Донское", "Донской", "Дорогобуж", "Дрезна", "Дубна", "Дубовка", "Дудинка", "Дыгулыбгей", "Дюртюли", "Дятьково", "Евпатория", "Егорлыкская", "Егорьевск", "Ейск", "Екатеринбург", "Елабуга", "Еланский", "Елань", "Елец", "Елизаветинская", "Елизово", "Еманжелинск", "Емва", "Емельяново", "Енисейск", "Ермолино", "Ершов", "Ессентуки", "Ессентукская", "Ефремов", "Железноводск", "Железногорск-Илимский", "Железногорск, Красноярский край", "Железногорск, Курская область", "Жердевка", "Жигулёвск", "Жирновск", "Жуков", "Жуковка", "Жуковский", "Забайкальск", "Завитинск", "Заводоуковск", "Заводской", "Заволжск", "Заволжье", "Завьялово", "Заинск", "Закаменск", "Заозерный", "Заполярный", "Запрудня", "Зарайск", "Заречный, Пензенская область", "Заречный, Свердловская область", "Заринск", "Заюково", "Звенигово", "Звенигород", "Зверево", "Зеленогорск", "Зеленоградск", "Зеленодольск", "Зеленокумск", "Зеленчукская", "Зерноград", "Зея", "Зима", "Зимовники", "Златоуст", "Змеиногорск", "Знаменка", "Знаменск", "Знаменское", "Зольская", "Зубова Поляна", "Зуевка", "Ивангород", "Иваново", "Ивановская", "Ивантеевка", "Ивдель", "Иглино", "Игра", "Ижевск", "Избербаш", "Излучинск", "Изобильный", "Икряное", "Иланский", "Илек", "Иловля", "Ильинский", "Ильский", "Инза", "Иноземцево", "Инской", "Инта", "Ипатово", "Ирбит", "Иркутск", "Исилькуль", "Искитим", "Исламей", "Истра", "Ишеевка", "Ишим", "Ишимбай", "Йошкар-Ола", "Каа-Хем", "Кавалерово", "Кавказская", "Кадуй", "Казанская", "Казань", "Калач", "Калач-на-Дону", "Калачинск", "Калининград", "Калининец", "Калининск", "Калининская", "Калтан", "Калуга", "Калязин", "Камбарка", "Каменка", "Каменоломни", "Каменск-Уральский", "Каменск-Шахтинский", "Камень-на-Оби", "Камень-Рыболов", "Камешково", "Камские Поляны", "Камызяк", "Камышин", "Камышлов", "Канаш", "Кандалакша", "Кандры", "Каневская", "Канск", "Кантемировка", "Кантышево", "Карабаново", "Карабаш", "Карабудахкент", "Карабулак", "Карасук", "Карачаевск", "Карачев", "Каргополь", "Карпинск", "Карталы", "Карымское", "Касимов", "Касли", "Каспийск", "Касумкент", "Катав-Ивановск", "Катайск", "Катыр-Юрт", "Качканар", "Кашин", "Кашира", "Каякент", "Кез", "Кемерово", "Кемь", "Керчь", "Киевское", "Кизел", "Кизилюрт", "Кизляр, Республика Дагестан", "Кизляр, Республика Северная Осетия - Алания", "Кизнер", "Кимовск", "Кимры", "Кингисепп", "Кинель", "Кинель-Черкассы", "Кинешма", "Киреевск", "Киренск", "Киржач", "Кириши", "Киров, Калужская область", "Киров, Кировская область", "Кировград", "Кирово-Чепецк", "Кировск, Ленинградская область", "Кировск, Мурманская область", "Кирсанов", "Киселёвск", "Кисловодск", "Клетня", "Климово", "Клин", "Клинцы", "Ковдор", "Ковров", "Ковылкино", "Когалым", "Кодинск", "Козельск", "Козьмодемьянск", "Коломна", "Колпашево", "Колывань", "Кольцово", "Кольчугино", "Коммунар", "Комсомольск-на-Амуре", "Комсомольский", "Конаково", "Кондопога", "Кондратово", "Кондрово", "Коноша", "Константиновск", "Копейск", "Кораблино", "Кореновск", "Коркино", "Королёв", "Корсаков", "Коряжма", "Костомукша", "Кострома", "Котельники", "Котельниково", "Котельнич", "Котлас", "Котово", "Котовск", "Кохма", "Коченёво", "Кочубеевское", "Красково", "Красноармейск, Московская область", "Красноармейск, Саратовская область", "Краснобродский", "Красновишерск", "Красногвардейское, Республика Крым", "Красногвардейское, Ставропольский край", "Красногорск", "Красногорский", "Краснодар", "Краснозаводск", "Краснознаменск", "Краснокаменск", "Краснокамск", "Краснокумское", "Краснообск", "Красноперекопск", "Краснослободск", "Краснотурьинск", "Красноуральск", "Красноусольский", "Красноуфимск", "Красноярск", "Красный Кут", "Красный Сулин", "Красный Яр", "Кремёнки", "Криводановка", "Кривянская", "Кропоткин", "Крыловская", "Крымск", "Кстово", "Кубинка", "Кувандык", "Кугеси", "Кудымкар", "Кузнецк", "Куйбышев", "Кукмор", "Кулебаки", "Кулешовка", "Кулунда", "Кумертау", "Кунгур", "Купино", "Курагино", "Курган", "Курганинск", "Куровское", "Курсавка", "Курск", "Курская", "Куртамыш", "Курчалой", "Курчатов", "Куса", "Кушва", "Кущёвская", "Кызыл", "Кыштым", "Кяхта", "Лабинск", "Лабытнанги", "Лагань", "Ладожская", "Лакинск", "Лангепас", "Лебедянь", "Леваши", "Левокумское", "Ленинградская", "Ленинкент", "Лениногорск", "Ленинск", "Ленинск-Кузнецкий", "Ленск", "Лермонтов", "Лесной", "Лесозаводск", "Лесосибирск", "Ливны", "Ликино-Дулёво", "Линёво", "Липецк", "Лиски", "Лихославль", "Лобня", "Лодейное Поле", "Лосино-Петровский", "Луга", "Луза", "Лукоянов", "Луховицы", "Лучегорск", "Лысково", "Лысогорская", "Лысьва", "Лыткарино", "Льгов", "Люберцы", "Любинский", "Людиново", "Лянтор", "Магадан", "Магдагачи", "Магнитогорск", "Майкоп", "Майма", "Майртуп", "Майский", "Малаховка", "Малая Вишера", "Малгобек", "Малоярославец", "Мамадыш", "Мамедкала", "Мантурово", "Мариинск", "Маркова", "Маркс", "Марьянская", "Маслянино", "Матвеев Курган", "Махачкала", "Мга", "Мегион", "Медведево", "Медведовская", "Медвежьегорск", "Медногорск", "Межгорье", "Междуреченск", "Междуреченский", "Меленки", "Мелеуз", "Менделеевск", "Мензелинск", "Мескер-Юрт", "Месягутово", "Миасс", "Миллерово", "Минеральные Воды", "Минусинск", "Мирный, Архангельская область", "Мирный, Республика Саха", "Михайлов", "Михайловка", "Михайловск", "Михайловская", "Михайловское", "Михнево", "Мичуринск", "Могойтуй", "Могоча", "Можайск", "Можга", "Моздок", "Мокшан", "Монино", "Мончегорск", "Морозовск", "Моршанск", "Москва", "Мостовской", "Муравленко", "Мурманск", "Мурмаши", "Муром", "Муромцево", "Мценск", "Мыски", "Мытищи", "Набережные Челны", "Навашино", "Навля", "Надежда", "Надым", "Назарово", "Назрань", "Называевск", "Нальчик", "Нариманов",
    "Наро-Фоминск", "Нартан", "Нарткала", "Нарышкино", "Нарьян-Мар", "Нахабино", "Находка", "Невель", "Невельск", "Невинномысск", "Невьянск", "Незлобная", "Некрасовский", "Нелидово", "Неман", "Нерехта", "Нерчинск", "Нерюнгри", "Нестеровская", "Нефтегорск", "Нефтекамск", "Нефтекумск", "Нефтеюганск", "Нижневартовск", "Нижнее Казанище", "Нижнекамск", "Нижнесортымский", "Нижнеудинск", "Нижний Ломов", "Нижний Новгород", "Нижний Тагил", "Нижняя Мактама", "Нижняя Салда", "Нижняя Тура", "Никель", "Николаевск", "Николаевск-на-Амуре", "Никольск", "Никольское", "Новая Ляля", "Новая Усмань", "Новоалександровск", "Новоалтайск", "Новоаннинский", "Нововеличковская", "Нововоронеж", "Новодвинск", "Новое Девяткино", "Новозыбков", "Новокручининский", "Новокубанск", "Новокузнецк", "Новокуйбышевск", "Новоминская", "Новомихайловский", "Новомичуринск", "Новомосковск", "Новомышастовская", "Новоорск", "Новопавловск", "Новопокровская", "Новороссийск", "Новосергиевка", "Новосибирск", "Новоспасское", "Новотитаровская", "Новотроицк", "Новоузенск", "Новоульяновск", "Новоуральск", "Новочебоксарск", "Новочеркасск", "Новошахтинск", "Новый Городок, Кемеровская область", "Новый городок, Московская область", "Новый Кяхулай", "Новый Оскол", "Новый Уренгой", "Новый Хушет", "Ногинск", "Ногир", "Норильск", "Ноябрьск", "Нурлат", "Нытва", "Нягань", "Нязепетровск", "Няндома", "Обливская", "Обнинск", "Обоянь", "Обухово", "Обь", "Одинцово", "Озёрный", "Озёрск", "Озёры", "Ойсхара", "Октябрьск", "Октябрьская", "Октябрьский, Московская область", "Октябрьский, Республика Башкортостан", "Октябрьское, Республика Крым", "Октябрьское, Республика Северная Осетия - Алания", "Окуловка", "Оленегорск", "Омск", "Омутнинск", "Онега", "Онохой", "Опочка", "Орёл", "Оренбург", "Орехово-Зуево", "Орловский", "Орск", "Оса", "Осинники", "Осташков", "Остров", "Острогожск", "Отрадная", "Отрадное", "Отрадный", "Оха", "Очёр", "Павлово", "Павловск, Алтайский край", "Павловск, Воронежская область", "Павловская", "Павловский Посад", "Палласовка", "Пангоды", "Партизанск", "Пенза", "Первомайск", "Первомайский, Забайкальский край", "Первомайский, Тамбовская область", "Первомайский, Челябинская область", "Первоуральск", "Пересвет", "Переславль-Залесский", "Пермь", "Персиановский", "Пестово", "Песчанокопское", "Петров Вал", "Петровск", "Петровск-Забайкальский", "Петровская", "Петрозаводск", "Петропавловск-Камчатский", "Петухово", "Петушки", "Печора", "Печоры", "Пикалёво", "Пионерский", "Питкяранта", "Плавск", "Пласт", "Пластуновская", "Платнировская", "Плесецк", "Плиево", "Поворино", "Пограничный", "Подольск", "Подпорожье", "Пойковский", "Покачи", "Покров", "Покровка", "Покровское", "Полазна", "Полевской", "Полтавская", "Полысаево", "Полярные Зори", "Полярный", "Поронайск", "Посёлок имени Морозова", "Поспелиха", "Похвистнево", "Почеп", "Правдинский", "Прасковея", "Приволжск", "Приволжский", "Приморский", "Приморско-Ахтарск", "Приозерск", "Приютово", "Прогресс", "Прокопьевск", "Пролетарск", "Промышленная", "Протвино", "Прохладный", "Псебай", "Псков", "Пугачёв", "Пушкино", "Пущино", "Пыть-Ях", "Пышма", "Пятигорск", "Радужный, Владимирская область", "Радужный, Югра", "Раевский", "Развилка", "Разумное", "Райчихинск", "Ракитное", "Раменское", "Рассказово", "Ревда", "Редкино", "Реж", "Реутов", "Рефтинский", "Ржев", "Ровеньки", "Родники", "Роза", "Рославль", "Россошь", "Ростов", "Ростов-на-Дону", "Рошаль", "Рощино", "Рощинский", "Ртищево", "Рубцовск", "Руза", "Рузаевка", "Рыбинск", "Рыбное", "Рыльск", "Ряжск", "Рязань", "Сагопши", "Саки", "Салават", "Салехард", "Сальск", "Самара", "Самарское", "Самашки", "Санкт-Петербург", "Саракташ", "Саранск", "Сарапул", "Саратов", "Саров", "Сасово", "Сатка", "Сафоново", "Саяногорск", "Саянск", "Светлогорск", "Светлоград", "Светлый Яр", "Светлый, Калининградская область", "Светлый, Саратовская область", "Светогорск", "Свирск", "Свободный", "Свободы", "Севастополь", "Северный", "Северобайкальск", "Северодвинск", "Североморск", "Североуральск", "Северск", "Северская", "Сегежа", "Селенгинск", "Сельцо", "Селятино", "Семендер", "Семёнов", "Семикаракорск", "Семилуки", "Сергач", "Сергиев Посад", "Сердобск", "Серноводская", "Серов", "Серпухов", "Сертолово", "Сибай", "Сибирский", "Сиверский", "Сим", "Симферополь", "Скопин", "Славгород", "Славянка", "Славянск-на-Кубани", "Сланцы", "Слободской", "Слюдянка", "Смоленск", "Снежинск", "Снежногорск", "Собинка", "Советск, Калининградская область", "Советск, Кировская область", "Советская Гавань", "Советский, Республика Крым", "Советский, Республика Марий Эл", "Советский, Югра", "Сокол", "Соликамск", "Солнечногорск", "Солнечнодольск", "Солнечный, Хабаровский край", "Солнечный, Югра", "Соль-Илецк", "Сорочинск", "Сорск", "Сортавала", "Сосенский", "Сосновка", "Сосновоборск", "Сосновый Бор", "Сосногорск", "Софрино", "Сочи", "Спасск-Дальний", "Среднеуральск", "Средняя Ахтуба", "Ставрополь", "Старая Купавна", "Старая Русса", "Старовеличковская", "Стародеревянковская", "Стародуб", "Староминская", "Старомышастовская", "Старонижестеблиевская", "Старотитаровская", "Старощербиновская", "Старые Атаги", "Старый Оскол", "Степное", "Стерлитамак", "Сторожевая", "Стрежевой", "Строитель, Белгородская область", "Строитель, Тамбовская область", "Струнино", "Ступино", "Суворов", "Суворовская", "Судак", "Судогда", "Сузун", "Сунжа", "Сураж", "Сургут", "Суровикино", "Сурхахи", "Сухиничи", "Суходол", "Сухой Лог", "Сызрань", "Сыктывкар", "Сысерть", "Сясьстрой", "Тавда", "Таврическое", "Таганрог", "Тайга", "Тайшет", "Талдом", "Талица", "Таловая", "Тальменка", "Тамань", "Тамбов", "Тара", "Тарки", "Тарко-Сале", "Татарск", "Таштагол", "Тбилисская", "Тверь", "Тейково", "Темрюк", "Терек", "Тетюши", "Тимашёвск", "Тихвин", "Тихорецк", "Тобольск", "Товарково", "Тогучин", "Толбазы", "Тольятти", "Томилино", "Томск", "Топки", "Торжок", "Торопец", "Тосно", "Тоцкое Второе", "Трёхгорный", "Троицк", "Троицкая", "Троицкий", "Троицкое", "Трубчевск", "Трудобеликовский", "Трудовое", "Туапсе", "Туймазы", "Тула", "Тулун", "Тульский", "Туринск", "Тутаев", "Тучково", "Тында", "Тырныауз", "Тюкалинск", "Тюмень", "Тяжинский", "Ува", "Уварово", "Углич", "Удачный", "Удельная", "Удомля", "Ужур", "Узловая", "Улан-Удэ", "Ульяновка", "Ульяновск", "Унеча", "Урай", "Уренгой", "Урень", "Урус-Мартан", "Уруссу", "Урюпинск", "Усинск", "Усмань", "Усолье-Сибирское", "Успенское", "Уссурийск", "Усть-Абакан", "Усть-Джегута", "Усть-Донецкий", "Усть-Илимск", "Усть-Катав", "Усть-Кинельский", "Усть-Кут", "Усть-Лабинск", "Усть-Ордынский", "Уфа", "Ухта", "Учалы", "Учкекен", "Уяр", "Фёдоровский", "Феодосия", "Фокино, Брянская область", "Фокино, Приморский край", "Фролово", "Фрязино", "Фряново", "Фурманов", "Хабаровск", "Хадыженск", "Ханская", "Ханты-Мансийск", "Харабали", "Хасавюрт", "Хасанья", "Хвалынск", "Хилок", "Химки", "Холмск", "Холмская", "Хороль", "Хотьково", "Целина", "Цивильск", "Цимлянск", "Цоци-Юрт", "Чайковский", "Чалтырь", "Чапаевск", "Чаплыгин", "Чебаркуль", "Чебоксары", "Чегдомын", "Чегем", "Чегем Второй", "Чекмагуш", "Челябинск", "Червлённая", "Чердаклы", "Черемхово", "Черепаново", "Череповец", "Черкесск", "Черлак", "Черниговка", "Черноголовка", "Черногорск", "Черноморское", "Чернушка", "Чернышевск", "Чернянка", "Черняховск", "Чертково", "Чехов", "Чистополь", "Чита", "Чишмы", "Чкаловск", "Чугуевка", "Чудово", "Чулым", "Чунский", "Чусовой", "Шагонар", "Шадринск", "Шали", "Шалушка", "Шамхал", "Шамхал-Термен", "Шарыпово", "Шарья", "Шатура", "Шаховская", "Шахты", "Шахунья", "Шебекино", "Шексна", "Шелехов", "Шелковская", "Шерегеш", "Шерловая Гора", "Шилка", "Шилово", "Шимановск", "Шипуново", "Шира", "Шлиссельбург", "Шумерля", "Шумиха", "Шушенское", "Шуя", "Щёкино", "Щёлкино", "Щёлково", "Щигры", "Щучье", "Экажево", "Электрогорск", "Электросталь", "Электроугли", "Элиста", "Эльбан", "Эльхотово", "Энгельс", "Энем", "Эртиль", "Югорск", "Южа", "Южно-Сахалинск", "Южно-Сухокумск", "Южноуральск", "Южный", "Юрга", "Юрьев-Польский", "Юрюзань", "Юца", "Яблоновский", "Яйва", "Якутск", "Ялта", "Ялуторовск", "Янаул", "Яранск", "Яровое", "Ярославль", "Ярцево", "Ясногорск", "Ясный", "Яхрома", "Яшкино", "Яя"];
  breeds: any;
  puppyTests: Array<PuppyTest>;

  isOnboardingVisible: boolean = false;

  constructor(private http: HttpClient, private breederService: BreederControllerService, private injector: Injector,
    private notificationServie: NotificationBarService) {
  }

  initApplication() {
    return new Promise<void>((resolve, reject) => {
      this.breederService.meUsingGET().subscribe((res) => {
        this.meData = res;
        this.http.get('/api/dict').subscribe(dict => {
          this.breeds = dict['breeds'];
          this.puppyTests = dict['puppyTests'];

          if (window.location.href.indexOf('/pass-link-fail') != -1) {
            let router = this.injector.get(Router);
            router.navigateByUrl('/remind-password');
            this.notificationServie.setContext('Ссылка для смены пароля устарела. Сделайте повторный запрос.', false);
            this.notificationServie.setVisibility(true);
            resolve();
          }

          if (this.meData.type == 'BREEDER')
            this.breederService.getBreederUsingGET(this.meData.id).subscribe(res => {
              this.userData = res;
              if (window.location.href.indexOf('/email') != -1)
                this.resolveEmailConfirm();
              resolve();
            });
          else
            resolve();
        });
      }, (err) => {
        if (err.status == 423) {
          this.meData = {type: 'BLOCKED'};
          let router = this.injector.get(Router);
          router.navigateByUrl('/breeder-landing');
          this.notificationServie.setContext('К сожалению, ваш аккаунт заблокирован. Help@petman.co', false);
          this.notificationServie.setVisibility(true);
          resolve();
        }
      });
    });
  }

  resolveEmailConfirm(): void {
    let router = this.injector.get(Router);
    if (window.location.href.indexOf('/email-success') != -1) {
      router.navigateByUrl('/breeder-profile');
      this.notificationServie.setContext('Ваша почта успешно подтверждена', true);
      this.notificationServie.setVisibility(true);
      this.isOnboardingVisible = true;
      //@ts-ignore
      ym(55779592, 'reachGoal', 'MailConfirmed');
    } else if (window.location.href.indexOf('/email-fail') != -1) {
      router.navigateByUrl('/breeder-landing');
      this.notificationServie.setContext('Ошибка подтверждения почты', false);
      this.notificationServie.setVisibility(true);
    }
  }

  public uploadAvatarImage(body: FormData) {
    return this.http.post('/api/upload/avatar', body);
  }

  public uploadNurceryGalleryImage(body: FormData) {
    return this.http.post('/api/upload/gallery', body);
  }

  public uploadPersonalImage(body: FormData) {
    return this.http.post('/api/upload/personal', body);
  }

  public uploadPetImage(body: FormData) {
    return this.http.post('api/upload/pet', body);
  }

  fieldAutocomplete(searchArray: any[], focus$: Subject<string>, click$: Subject<string>, instance: NgbTypeahead): (text$: Observable<string>) => Observable<any[]> {
    return (text$: Observable<string>) => {
      let values = searchArray;
      // For breeds & parent tests
      if (searchArray[0] && searchArray[0].name)
        values = searchArray.map(it => { return it.name });
      // For mother & fathers
      else if (searchArray[0] && searchArray[0].nickname)
        values = searchArray.map(it => { return it.nickname });
      const debouncedText$ = text$.pipe(debounceTime(100), distinctUntilChanged());
      const clicksWithClosedPopup$ = click$.pipe(filter(() => instance.isPopupOpen()));
      const inputFocus$ = focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? values
          : values.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)))
      );
    }
  }

  getTextareaLimit(field: string, limit: number): number{
    if (!field)
      return limit;
    return limit - field.length;
  }

  disableBodyScrolling(target?): void {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "15px";
  }

  enableBodyScrolling(): void {
    document.body.removeAttribute('style');
  }

  toggleDropdownTextInput(id: string, event: any): void {
    document.getElementById(id).focus(event.target.value);
  }

  getTooltipTrigger(): string {
    return window.innerWidth < 770 ? 'click' : 'hover';
  }

  validateEmailInput(email: string): boolean {
    let re = /^[A-Za-z0-9]+([\.-]?[A-Za-z0-9]+)*@[A-Za-z]+([\.-]?[A-Za-z]+)*(\.[A-Za-z]{2,3})+$/;
    return re.test(email);
  }

  validatePhoneInput(phone: string): boolean {
    let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return re.test(phone);
  }

  getImageDataForUpload(data: any): FormData {
    const body = new FormData();
    body.append('image', data.inputFile, data.inputFile.name || "main_image.jpg");
    body.append('rect',
      (Math.floor(data.props.position.x - (data.props.width / 2 / data.props.scale)) + "," +
        (Math.floor(data.props.position.y - data.props.height / 2 / data.props.scale)) + "," +
        Math.floor(data.props.width / data.props.scale) + "," +
        Math.floor(data.props.height / data.props.scale)
      ));
    return body;
  }
}
