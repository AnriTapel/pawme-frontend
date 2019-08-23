import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BreederProfileComponent } from './breeder-profile/breeder-profile.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'breeder-landing', component: BreederLandingComponent},
  {path: 'breeder-profile', component: BreederProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
