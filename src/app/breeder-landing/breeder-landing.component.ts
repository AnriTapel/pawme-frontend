import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-breeder-landing',
  templateUrl: './breeder-landing.component.html',
  styleUrls: ['./breeder-landing.component.scss']
})
export class BreederLandingComponent implements OnInit {

  firstSliderData: any[];
  secondSliderData: any[];

  firstSliderActiveIndex: number = 0;
  secondSliderActiveIndex: number = 0;

  @HostListener('window:resize', ['$event'])
  screenResizeListner(event?) {
    this.firstSlider.isControls = window.innerWidth > 769 ? false : true;
    this.secondSlider.isControls = window.innerWidth > 769 ? false : true;
  }

  @ViewChild('firstSlider', { static: true })
  firstSlider: any;
  @ViewChild('secondSlider', { static: true })
  secondSlider: any;

  constructor() { }

  ngOnInit() {
    this.screenResizeListner();

    this.firstSliderData = [
      { img: '../../assets/img/slider-img.png', text: 'Общая информация + фотографии' },
      { img: '../../assets/img/slider-img.png', text: 'О себе' },
      { img: '../../assets/img/slider-img.png', text: 'Родители щенков' },
      { img: '../../assets/img/slider-img.png', text: 'Информация о щенках' },
      { img: '../../assets/img/slider-img.png', text: 'Подключение аккаунта Instagram' }
    ];

    this.secondSliderData = [
      { img: '../../assets/img/slider-img.png', text: 'Редактирование своей страницы' },
      { img: '../../assets/img/slider-img.png', text: 'Общение с покупателями' },
      { img: '../../assets/img/slider-img.png', text: 'Своя форма заявки на щенка' },
      { img: '../../assets/img/slider-img.png', text: 'Обработка заявок от покупателей' },
    ];

    this.firstSlider.animation = 'fade';
    this.firstSlider.interval = 4000;

    this.secondSlider.animation = 'fade';
    this.secondSlider.interval = 4000;
  }

  private onFirstSliderActiveChanged(event: any): void {
    this.firstSliderActiveIndex = event.relatedTarget;
  }

  private onSecondSliderActiveChanged(event: any): void {
    this.secondSliderActiveIndex = event.relatedTarget;
  }

  private firstSliderTitleClicked(index: number): void {
    this.firstSlider.selectSlide(index);
  }

  private secondSliderTitleClicked(index: number): void {
    this.secondSlider.selectSlide(index);
  }

  private showSignUpPopup(){
    document.getElementById("popup-wrapper").style.visibility = 'visible';
  }
}