import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Surveyresult } from '../shared/surveyresult';

@Injectable()
export class SurveyresultsService {
  constructor(private restangular: Restangular, private ProcessHttpmsgService: ProcessHttpmsgService) { }
  

  getSurveyresults(): Observable<Surveyresult[]> {
    return this.restangular.all('surveyresults').getList();
  }
  
  getSurveyresult(id: number): Observable<Surveyresult> {
    return  this.restangular.one('surveyresults',id).get();
  }

  submitSurveyresults(Surveyresult): Observable<Surveyresult> {
    return  this.restangular.all('surveyresults').post(Surveyresult);
  }

  deleteSurveyresults(id: number): Observable<Surveyresult> {
    return  this.restangular.one('surveyresults',id).remove();
  }

}
