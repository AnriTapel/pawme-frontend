import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { LyResizingCroppingImages, ImgCropperConfig } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { EventService } from 'src/app/services/event-service/events.service';

const styles = (theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: '1em'
    }
  },
  cropping: {
    maxWidth: '400px',
    height: '300px'
  },
  icon: {
    marginEnd: '.25em'
  }
});

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements AfterViewInit {

  classes = this.theme.addStyleSheet(styles);
  @ViewChild(LyResizingCroppingImages, {static: true}) img: LyResizingCroppingImages;
  myConfig: ImgCropperConfig = {
    width: 200, // Default `250`
    height: 200 // Default `200`
  };

  constructor(@Inject(LyTheme2) private theme: LyTheme2, public popupService: PopupTemplateService,
    private eventService: EventService) { }

  ngAfterViewInit(): void{
    setTimeout(() => {
      document.getElementById('image-input').click();
    }, 250);
  }

  crop() {
    this.img.crop();
  }
  oncropped(e) {
    this.eventService.raiseEvent('image-cropped', e);
  }
  onloaded() {
    console.log('img loaded');
  }
  onerror() {
    console.warn('img not loaded');
  }
}
