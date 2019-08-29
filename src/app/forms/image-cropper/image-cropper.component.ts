import { Component, AfterViewInit, ViewChild, Inject, Input } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { LyResizingCroppingImages, ImgCropperConfig } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { EventService } from 'src/app/services/event-service/events.service';
import { Observable } from 'rxjs';

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
    maxWidth: '450px',
    height: '400px'
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

  @Input() params: any;
  @ViewChild(LyResizingCroppingImages, { static: true }) img: LyResizingCroppingImages;
  @ViewChild('cropping', { static: true }) cropping: any;
  classes = this.theme.addStyleSheet(styles);
  inputFile: any;
  myConfig: ImgCropperConfig;

  constructor(@Inject(LyTheme2) private theme: LyTheme2, public popupService: PopupTemplateService,
    public eventService: EventService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myConfig = {
        width: this.params.width,
        height: this.params.height
      };
      if (this.params.imageUrl) {
        this.cropping.setImageUrl(this.params.imageUrl);
        let base64Handler = this.eventService.subscribe('image-base64-loaded', (base64) => {
          fetch(base64)
          .then(res => res.blob())
          .then(blob => {
            this.inputFile = new File([blob], "main_image.jpg");
          });
          base64Handler.unsubscribe();
        });
        this.getBase64ByImageUrl();
      }
      else
        document.getElementById('image-input').click();
    }, 250);
  }

  inputFileSelected(event: any) {
    this.inputFile = <File>event.target.files[0];
    this.cropping.selectInputEvent(event);
  }

  getBase64ByImageUrl() {
    let xhr = new XMLHttpRequest();
    let result;
    xhr.onload = () => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.eventService.raiseEvent('image-base64-loaded', reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', this.params.imageUrl);
    xhr.responseType = 'blob';
    xhr.send();
  }

  changeInputImage() {
    document.getElementById('change-image-input').click();
  }

  crop() {
    this.img.crop();
  }
  onCropped(e) {
    this.eventService.raiseEvent('image-cropped', { inputFile: this.inputFile, props: e });
  }

}
