import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DogCardService } from 'src/app/services/dog-card-service/dog-card.service';
import { CarouselComponent } from 'angular-bootstrap-md';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss']
})
export class DogCardComponent implements OnInit {

  dog: any;
  isPuppy: boolean;

  @ViewChild(CarouselComponent, {static: true})
  gallery: CarouselComponent

  constructor(private appService: AppService, public dogCardService: DogCardService, private popupService: PopupTemplateService) {
    this.dog = dogCardService.getDog();
    console.log(' this.dog', this.dog)
    if (this.dog.price == null) {
      this.dog.price = "уточняйте у заводчика"
    }
      
    this.isPuppy = dogCardService.getIsPuppy();
  }

  ngOnInit() {
  }

  getPuppyAge(): string{
    var bthDate, curDate, ageYears, ageMonths, ageDays, ageText;
    bthDate = new Date(this.dog.birthDate);
    curDate = new Date();
    if (bthDate > curDate) 
      return;
    ageYears = curDate.getFullYear() - bthDate.getFullYear();
    ageMonths = curDate.getMonth() - bthDate.getMonth();
    ageDays = curDate.getDate() - bthDate.getDate(); 
    if (ageDays < 0)
      ageMonths = ageMonths - 1;
    if (ageMonths < 0) {
      ageYears = ageYears - 1;
      ageMonths = ageMonths + 12;
    }
    ageMonths += 12 * ageYears;
    ageText = "";
    
    if (ageMonths > 0) {
      ageText = ageMonths + " месяц";
      if (ageMonths > 1 && ageMonths < 5)
        ageText = ageText + "а";
      if (ageMonths > 4 && !(ageMonths > 20 && ageMonths % 10 == 1))
        ageText = ageText + "ев";
    } else {
      ageText = "< 1 месяца";
    }

    return ageText;
  }

  getAvailSaleDate(): string {
    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    if (!this.appService.userData.puppiesInfo || !this.appService.userData.puppiesInfo.age)
      return '16 августа';
    let birthDate = new Date(this.dog.birthDate);
    let minAgeForSale = this.appService.userData.puppiesInfo.age * 7;
    let saleAvailDate = new Date(birthDate.setDate(birthDate.getDate() + minAgeForSale));
    return saleAvailDate.getDate() + ' ' + months[saleAvailDate.getMonth()] + ' ' + saleAvailDate.getFullYear();
  }

  showBreederMessagePopup(): void{
    this.popupService.setPopupParams(null);
    this.popupService.setCurrentForm('breeder-message');
    this.dogCardService.setVisible(false);
    this.popupService.setShowStatus(true);
  }

  closeCard(): void{
    this.dogCardService.setDog(null);
    this.dogCardService.setVisible(false);
  }

}
