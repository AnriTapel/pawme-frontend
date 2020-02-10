import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MailPageComponent } from './forms/mail-page/mail-page.component';
import { FooterComponent } from './template-blocks/footer/footer.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { PopupTemplateComponent } from './template-blocks/popup-template/popup-template.component';
import { HeaderComponent } from './template-blocks/header/header.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { PopupTemplateService } from './services/popup-service/popup-template.service';
import { AlertService } from './services/alert-service/alert.service';
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
import { BreederControllerService, AdminControllerService, DictionaryControllerService, MediaControllerService, SearchControllerService, CustomerControllerService } from './api/api';
import { NotificationBarComponent } from './template-blocks/notification-bar/notification-bar.component';
import { BreederMessageComponent } from './forms/breeder-message/breeder-message.component';
import { DogCardComponent } from './forms/dog-card/dog-card.component';
import { ImageGalleryComponent } from './template-blocks/image-gallery/image-gallery.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { AlertComponent } from './template-blocks/alert/alert.component';
import { AboutUsComponent } from './secondary-page/about-us/about-us.component';
import { ContactUsComponent } from './secondary-page/contact-us/contact-us.component';
import { FaqComponent } from './secondary-page/faq/faq.component';
import { ShareButtonsComponent } from './template-blocks/share-buttons/share-buttons.component';
import { OnboardingComponent } from './forms/onboarding/onboarding.component';
import { PageNotFoundComponent } from './secondary-page/page-not-found/page-not-found.component';
import { SearchPageComponent } from './forms/search-page/search-page.component';
import {IMaskModule} from 'angular-imask';
import { ClientPageComponent } from './forms/client-page/client-page.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ArticlesComponent } from './articles/articles.component';
import { DetailComponent } from './articles/detail/detail.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MenuComponent } from './template-blocks/menu/menu.component';
import { Header2Component } from './template-blocks/header2/header2.component';
import { VersionComponent } from './forms/version/version.component';
import { ChatComponent } from './chat/chat.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { ClientChatComponent } from './forms/client-chat/client-chat.component';
import { ChatService } from './services/chat-service/chat.service';
import { FirstMessageComponent } from './forms/first-message/first-message.component';
import { ChatRoomsPipe } from './pipes/chat-rooms.pipe';
import { SheltersSearchComponent } from './shelters-search/shelters-search.component';








export function initApp(appSerivce: AppService){
  return (): Promise<any> => {
    return appSerivce.initApplication();
    
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BreederLandingComponent,
    HomePageComponent,
    MailPageComponent,
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
    AdminPanelComponent,
    NotificationBarComponent,
    BreederMessageComponent,
    DogCardComponent,
    ImageGalleryComponent,
    ChangePasswordComponent,
    AlertComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    ShareButtonsComponent,
    OnboardingComponent,
    PageNotFoundComponent,
    SearchPageComponent,
    ClientPageComponent,
    ArticlesComponent,
    DetailComponent,
    ClickOutsideDirective,
    MenuComponent,
    Header2Component,
    VersionComponent,
    ChatComponent,
    ClientRegistrationComponent,
    ClientChatComponent,
    FirstMessageComponent,
    ChatRoomsPipe,
    SheltersSearchComponent
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
    LyResizingCroppingImageModule,
    IMaskModule,
    NgSelectModule,
    CommonModule,
    NgxPaginationModule,
    FilterPipeModule
  ],
  exports: [
    ClickOutsideDirective
  ],
  providers: [
    AppService,
    PopupTemplateService,
    EventService,
    AdminControllerService,
    CustomerControllerService,
    BreederControllerService,
    SearchControllerService,
    DictionaryControllerService,
    MediaControllerService,
    AlertService,
    ChatService,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AppService], multi: true },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
