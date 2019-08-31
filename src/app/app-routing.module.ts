import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BreederProfileComponent } from './breeder-profile/breeder-profile.component';
import { BreederPageComponent } from './breeder-page/breeder-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { RemindPasswordComponent } from './forms/remind-password/remind-password.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'remind-password', component: RemindPasswordComponent},
  {path: 'breeder-landing', component: BreederLandingComponent},
  {path: 'breeder-profile', component: BreederProfileComponent},
  {path: 'breeder-page', component: BreederPageComponent},
  {path: 'admin-panel', component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
