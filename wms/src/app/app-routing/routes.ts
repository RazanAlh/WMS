import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { WorkshopsComponent } from '../workshops/workshops.component';
import { SigninComponent } from '../signin/signin.component';
import { ManageworkshopsComponent } from '../manageworkshops/manageworkshops.component';
import { ManagesurveyComponent } from '../managesurvey/managesurvey.component';
import { DisplaysurveyComponent } from '../displaysurvey/displaysurvey.component';
import { DisplaycertificateComponent } from '../displaycertificate/displaycertificate.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'workshops', component: WorkshopsComponent},
  { path: 'contactus', component: ContactComponent },
  { path: 'about',  component: AboutComponent},
  { path: 'manageworkshops', component: ManageworkshopsComponent},
  { path: 'managesurveys', component: ManagesurveyComponent},
  { path: 'managesurveys/:id', component: ManagesurveyComponent},
  { path: 'signin',  component: SigninComponent},
  { path: 'displaysurvey/:id', component: DisplaysurveyComponent},
  { path: 'displaycertificate', component: DisplaycertificateComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
