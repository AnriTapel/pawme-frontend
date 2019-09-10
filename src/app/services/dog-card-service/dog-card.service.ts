import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogCardService {

  private dog: any;
  private isPuppy: boolean;
  private visible: boolean;

  constructor() { }

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
    if (visible){
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else
      document.getElementsByTagName("body")[0].style.overflowY = "scroll";
  }
}
