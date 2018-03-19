import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from  '@angular/forms';
import { HttpModule } from  '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdListModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { SigninService } from './services/signin.service';
import { FeedbackService } from './services/feedback.service';
import { WorkshopService } from './services/workshop.service';
import { SurveyService } from './services/survey.service';
import { SurveyresultsService } from './services/surveyresults.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { ManagesurveyComponent } from './managesurvey/managesurvey.component';
import { DisplaysurveyComponent } from './displaysurvey/displaysurvey.component';
import { DisplaycertificateComponent } from './displaycertificate/displaycertificate.component';
import { ManageworkshopsComponent } from './manageworkshops/manageworkshops.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    SigninComponent,
    WorkshopsComponent,
    ManagesurveyComponent,
    DisplaysurveyComponent,
    DisplaycertificateComponent,
    ManageworkshopsComponent
  ],
    imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    MdListModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RestangularModule.forRoot(RestangularConfigFactory)

  ],

  providers: [SurveyresultsService, SurveyService, SigninService, FeedbackService, WorkshopService, {provide: 'BaseURL', useValue: baseURL}, ProcessHttpmsgService],
    entryComponents: [
        LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
