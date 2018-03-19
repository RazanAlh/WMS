import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Survey } from '../shared/survey';
import { Question } from '../shared/question';


@Injectable()
export class SurveyService {

  constructor(private restangular: Restangular, private ProcessHttpmsgService: ProcessHttpmsgService) { }
  

  getSurveyes(): Observable<Survey[]> {
    return this.restangular.all('surveys').getList();
  }
  
  getSurvey(id: number): Observable<Survey> {
    return  this.restangular.one('surveys',id).get();
  }

  getWorkshopSurvey(workshopid: number): Observable<Survey> {
    return this.restangular.all('surveys').getList({workshopid: workshopid})
    .map(surveys => surveys[0]);
  }

  submitSurvey(Survey): Observable<Survey> {
    return  this.restangular.all('surveys').post(Survey);
  }

  saveSurvey(Survey): Observable<Survey> {
    var firstSurvey = this.restangular.one('surveys',Survey.id);
    var editfirstSurvey = this.restangular.copy(firstSurvey);
    editfirstSurvey = Survey;
    editfirstSurvey.put();
    return this.restangular.one('surveys',Survey.id);
  }

  deleteSurvey(id: number): Observable<Survey> {
    return  this.restangular.one('surveys',id).remove();
  }

}
