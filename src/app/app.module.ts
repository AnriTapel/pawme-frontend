import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterComponent } from './template-blocks/footer/footer.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    BreederLandingComponent,
    HomePageComponent,
    FooterComponent
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
