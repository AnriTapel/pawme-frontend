import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { EventService } from 'src/app/services/event-service/events.service';

@Component({
  selector: 'app-about-nurcery-profile-page',
  templateUrl: './about-nurcery-profile-page.component.html',
  styleUrls: ['./about-nurcery-profile-page.component.scss']
})
export class AboutNurceryProfilePageComponent implements OnInit {

  nurceryData: any;
  isAdditionalBreed: boolean = false;

  @ViewChild('cityInstance', { static: true }) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', { static: true }) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', { static: true }) addBreedInstance: NgbTypeahead;
  @ViewChild('image', { static: true }) image: any;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(private appService: AppService, private popupService: PopupTemplateService, private eventService: EventService) { }

  ngOnInit() {
    this.nurceryData = {
      nurceryName: null,
      nurceryLocation: null,
      nurceryMainBreed: null,
      nurceryAdditionalBreed: null,
      aboutNurcery: null,
      nurceryProfileImage: null,
      nurceryGalleryImage: null,
      nurceryGallery: [],
      nurceryInstagram: null,
      nurcerySite: null,
      nurceryFacebook: null

    };
  }

  previewNurceryPhoto(): void {
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      const body = new FormData();
      body.append('image', data.inputFile, data.inputFile.name);
      body.append('rect', 
        (Math.floor(data.props.position.x - (data.props.width / 2 / data.props.scale)) + "," + 
        (Math.floor(data.props.position.y - data.props.height / 2 / data.props.scale))+ "," +
        Math.floor(data.props.width / data.props.scale) + "," +
        Math.floor(data.props.height / data.props.scale)
      ));
      
      this.appService.uploadAvatarImage(body).subscribe((e) => {
        console.log(e);
      });
      croppedHandler.unsubscribe();
    });
  }

  saveChanges() {
    console.log(this.nurceryData);
  }
}
