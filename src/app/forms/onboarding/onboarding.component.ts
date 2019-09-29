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
    { title: 'Разделы личного кабинета', desc: 'Заполнение личного кабинета разбито на несколько разделов. Они соответствуют блокам на вашей персональной странице. ', img: './assets/img/onboarding/slide-2.jpg' },
    { title: 'Заполнение разделов', desc: 'В каждом разделе есть список обязательных полей. После заполнения нажмите на специальную кнопку, чтобы сохранить изменения.', img: './assets/img/onboarding/slide-3.jpg' },
    { title: 'Полоса прогресса', desc: 'Покажет, сколько разделов уже заполнено на вашей странице. В конце вы получите статус "заводчик Petman", который будет обязательным требованием в полной версии платформы.', img: './assets/img/onboarding/slide-4.jpg' },
    { title: 'Меню личного кабинета', desc: 'В меню вы найдете ссылку на вашу страницу заводчика и раздел "Помощь", где мы собрали ответы на самые популярные вопросы. ', img: './assets/img/onboarding/slide-5.jpg' },
    { title: 'Заявки от покупателей', desc: 'Покупатели смогут связаться с вами через специальную кнопку на вашей странице. Сообщения вместе с контактными данными будут приходить на email, поэтому не забывайте регулярно проверять почту. ', img: './assets/img/onboarding/slide-6.jpg' },
    { title: 'Пример профиля', desc: 'Также мы подготовили для вас пример профессионально заполненной страницы, на который можно ориентироваться: ', img: './assets/img/onboarding/slide-7.jpg' },
  ];


  constructor(private appService: AppService) { }

  ngOnInit() {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    document.getElementsByTagName("body")[0].style.paddingRight = "15px";
  }

  ngOnDestroy() {
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    document.getElementsByTagName("body")[0].style.paddingRight = "0";
  }

  next(): void {
    this.index++;
  }

  close(): void {
    this.appService.isOnboardingVisible = false;
  }

}
