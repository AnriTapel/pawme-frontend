import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/template-blocks/popup-template/popup-template.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  constructor(public popupService: PopupTemplateService) { }

  ngOnInit() {
  }

}
