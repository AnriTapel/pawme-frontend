import { Injectable } from '@angular/core';
import { AppService } from '../app-service/app.service';

@Injectable({
  providedIn: 'root'
})
export class DogCardService {

  private dog: any;
  private isPuppy: boolean;
  private visible: boolean;

  constructor(private appService: AppService) { }

  getDog(): any{
    return this.dog;
  }

  setDog(dog: any): void{
    this.dog = dog;
  }

  getIsPuppy(): boolean{
    return this.isPuppy;
  }

  setIsPuppy(isPuppy: boolean): void{
    this.isPuppy = isPuppy;
  }

  getVisibility(): any{
    return this.visible;
  }

  setVisible(visible: boolean): void{
    this.visible = visible;
    if (visible)
      this.appService.disableBodyScrolling();
    else
      this.appService.enableBodyScrolling();
  }
}
