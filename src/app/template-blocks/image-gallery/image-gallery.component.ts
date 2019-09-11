import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CarouselComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements AfterViewInit {

  @Input() params: any;
  @ViewChild(CarouselComponent, {static: true})
  gallery: CarouselComponent

  constructor() { }

  ngAfterViewInit() {
    this.gallery.selectSlide(this.params.initIndex);
  }

}
