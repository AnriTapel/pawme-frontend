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
import { MailPageComponent } from './forms/mail-page/mail-page.component';
import { ChangePasswordComponent } from './forms/change-password/change-password.component';
import { AboutUsComponent } from './secondary-page/about-us/about-us.component';
import { ContactUsComponent } from './secondary-page/contact-us/contact-us.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'remind-password', component: RemindPasswordComponent},
  {path: 'changepass/:uuid', component: ChangePasswordComponent, pathMatch: 'full'},
  {path: 'breeder-landing', component: BreederLandingComponent},
  {path: 'breeder-profile', component: BreederProfileComponent},
  {path: 'breeder/:id', component: BreederPageComponent, pathMatch: 'full'},
  {path: 'preview/:id', component: BreederPageComponent, pathMatch: 'full'},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'confirm-email/:mail', component: MailPageComponent},
  {path: '**', component: BreederLandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
