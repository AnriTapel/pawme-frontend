import { Component, AfterViewInit, ViewChild, Inject, Input } from '@angular/core';
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
  uploadError: boolean = false;

  constructor(@Inject(LyTheme2) private theme: LyTheme2, public eventService: EventService) { }

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
      else if (window.innerWidth < 770)
        document.getElementById('image-input').click();
    }, 250);
  }

  ngOnDestroy(): void{
    this.eventService.raiseEvent('image-cropper-closed', null);
  }

  inputFileSelected(event: any) {
    this.uploadError  = false;
    var reader = new FileReader();
    let self = this;
    reader.onload = function (e) {
      let img = new Image();
      img.onload = () => {
        self.inputFile = <File>event.target.files[0];
        self.cropping.selectInputEvent(event);
      }
      img.onerror = () => {
        self.uploadError = true;
      }
      //@ts-ignore
      img.src = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  getBase64ByImageUrl() {
    let xhr = new XMLHttpRequest();
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
