import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'breeder-landing', component: BreederLandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
