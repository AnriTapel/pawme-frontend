import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DogCardService } from 'src/app/services/dog-card-service/dog-card.service';
import { CarouselComponent } from 'angular-bootstrap-md';

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

  constructor(public dogCardService: DogCardService) {
    this.dog = dogCardService.getDog();
    this.isPuppy = dogCardService.getIsPuppy();
  }

  ngOnInit() {
  }

  closeCard(){
    this.dogCardService.setDog(null);
    this.dogCardService.setVisible(false);
  }

}
