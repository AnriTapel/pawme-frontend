import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  index: number = 0;
  data = [
    { title: 'Добро пожаловать на платформу Petman!', desc: 'Сейчас мы проведем небольшой тур по личному кабинету и вашей странице заводчика', img: './assets/img/onboarding/slide-1.jpg' },
    { title: 'Разделы личного кабинета', desc: 'Заполнение личного кабинета разбито на несколько разделов. Они соответствуют блокам на вашей персональной странице.', img: './assets/img/onboarding/slide-2.jpg' },
    { title: 'Заполнение разделов', desc: 'В каждом разделе есть список обязательных полей. После заполнения нажмите на специальную кнопку, чтобы сохранить изменения.', img: './assets/img/onboarding/slide-3.jpg' },
    { title: 'Полоса прогресса', desc: 'Показывает, сколько разделов уже заполнено. В конце вы получите статус "заводчик Petman", который будет обязательным требованием в полной версии платформы.', img: './assets/img/onboarding/slide-4.jpg' },
    { title: 'Меню личного кабинета', desc: 'В меню вы найдете ссылку на вашу страницу заводчика и раздел "Помощь", где мы собрали ответы на самые популярные вопросы.', img: './assets/img/onboarding/slide-5.jpg' },
    { title: 'Заявки от покупателей', desc: 'Покупатели смогут связаться с вами через специальную кнопку на странице заводчика. Сообщения вместе с контактными данными приходят на email, поэтому не забывайте регулярно проверять почту.', img: './assets/img/onboarding/slide-6.jpg' },
    { title: 'Пример профиля', desc: 'В заключение тура мы предлагаем посмотреть пример профессионально заполненной страницы, на который можно ориентироваться в будущем.', img: './assets/img/onboarding/slide-7.jpg' },
  ];


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.disableBodyScrolling(document.getElementsByClassName('onboarding-container')[0]);
  }

  ngOnDestroy() {
    this.appService.enableBodyScrolling();
  }

  next(): void {
    this.index++;
  }

  close(): void {
    this.appService.isOnboardingVisible = false;
  }

  openDemoPage(): void{
    window.open('https://petman.co/breeder/604', '_blank');
    this.close();
  }

}
