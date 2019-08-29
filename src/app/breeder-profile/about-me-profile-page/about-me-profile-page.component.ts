import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from 'src/app/services/event-service/events.service';

@Component({
  selector: 'app-about-me-profile-page',
  templateUrl: './about-me-profile-page.component.html',
  styleUrls: ['./about-me-profile-page.component.scss']
})
export class AboutMeProfilePageComponent implements OnInit {

  breederData: any;
  currentClub: string = null;
  curCertificates: string[] = [];
  curPersonalImage: string;

  constructor(private popupService: PopupTemplateService, private appService: AppService, private eventService: EventService) { }

  ngOnInit() {
    this.breederData = {
      aboutMe: null,
      begining: null,
      nurceryFeatures: null,
      photo: null,
      clubs: [],
      certificates: []
    }
  }

  previewPersonalImage() {
    this.popupService.setPopupParams({ width: 270, height: 200, isRect: true,
      imageUrl: this.curPersonalImage ? "/img/" + this.breederData.photo.main + ".jpg" : null});
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPersonalImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.breederData.photo = imageData;
        this.curPersonalImage = "http://petman.co/img/" + imageData.preview + ".jpg";
      });
      croppedHandler.unsubscribe();
    });
  }

  deletePersonalImage(): void {
    this.curPersonalImage = null;
    this.breederData.photo = null;
  }

  uploadCertificates(event: any): void {
    for (let file of event.target.files) {
      this.breederData.certificates.push(file);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.curCertificates.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  deleteCertificate(index: number): void {
    this.curCertificates.splice(index, 1);
    this.breederData.certificates.splice(index, 1);
  }

  addClub(): void {
    this.breederData.clubs.push(this.currentClub);
    this.currentClub = null;
  }

  deleteClub(index: number): void {
    this.breederData.clubs.splice(index, 1);
  }

  saveChanges() {

  }

}
