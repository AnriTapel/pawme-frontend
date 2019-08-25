import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './template-blocks/footer/footer.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { PopupTemplateComponent } from './template-blocks/popup-template/popup-template.component';
import { HeaderComponent } from './template-blocks/header/header.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { PopupTemplateService } from './services/popup-service/popup-template.service';
import { FormsModule } from '@angular/forms';
import { BreederProfileComponent } from './breeder-profile/breeder-profile.component';
import { AboutNurceryProfilePageComponent } from './breeder-profile/about-nurcery-profile-page/about-nurcery-profile-page.component';
import { AboutPuppiesProfilePageComponent } from './breeder-profile/about-puppies-profile-page/about-puppies-profile-page.component';
import { PuppiesParentsProfilePageComponent } from './breeder-profile/puppies-parents-profile-page/puppies-parents-profile-page.component';
import { AboutMeProfilePageComponent } from './breeder-profile/about-me-profile-page/about-me-profile-page.component';
import { AddPuppyProfilePageComponent } from './breeder-profile/add-puppy-profile-page/add-puppy-profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RemindPasswordComponent } from './forms/remind-password/remind-password.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from './forms/image-cropper/image-cropper.component';
import { BreederPageComponent } from './breeder-page/breeder-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AppService } from './services/app-service/app.service';
import { EventService } from './services/event-service/events.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images'

@NgModule({
  declarations: [
    AppComponent,
    BreederLandingComponent,
    HomePageComponent,
    FooterComponent,
    PopupTemplateComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    BreederProfileComponent,
    AboutNurceryProfilePageComponent,
    AboutPuppiesProfilePageComponent,
    PuppiesParentsProfilePageComponent,
    AboutMeProfilePageComponent,
    AddPuppyProfilePageComponent,
    RemindPasswordComponent,
    ImageCropperComponent,
    BreederPageComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    WavesModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    LyThemeModule.setTheme('minima-light'),
    LyResizingCroppingImageModule
  ],
  providers: [
    AppService,
    PopupTemplateService,
    EventService,
    { provide: LY_THEME, useClass: MinimaLight, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
