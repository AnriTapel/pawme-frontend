import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DogCardService } from 'src/app/services/dog-card-service/dog-card.service';
import { CarouselComponent } from 'angular-bootstrap-md';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

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

  constructor(public dogCardService: DogCardService, private popupService: PopupTemplateService) {
    this.dog = dogCardService.getDog();
    this.isPuppy = dogCardService.getIsPuppy();
  }

  ngOnInit() {
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
