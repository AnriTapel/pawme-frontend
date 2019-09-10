import { Component, OnInit, Input } from '@angular/core';
import { DogCardService } from 'src/app/services/dog-card-service/dog-card.service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss']
})
export class DogCardComponent implements OnInit {

  dog: any;
  isPuppy: boolean;

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
