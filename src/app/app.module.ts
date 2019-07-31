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

@NgModule({
  declarations: [
    AppComponent,
    BreederLandingComponent,
    HomePageComponent,
    FooterComponent,
    PopupTemplateComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    WavesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
