import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreederLandingComponent } from './breeder-landing/breeder-landing.component';
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
import { FaqComponent } from './secondary-page/faq/faq.component';
import { PageNotFoundComponent } from './secondary-page/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', component: BreederLandingComponent},
  {path: 'breeder-landing', component: BreederLandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'remind-password', component: RemindPasswordComponent},
  {path: 'changepass/:uuid', component: ChangePasswordComponent, pathMatch: 'full'},
  {path: 'breeder-profile', component: BreederProfileComponent},
  {path: 'breeder/:id', component: BreederPageComponent, pathMatch: 'full'},
  {path: 'preview/:id', component: BreederPageComponent, pathMatch: 'full'},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'confirm-email/:mail', component: MailPageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
