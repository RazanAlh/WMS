import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular, private ProcessHttpmsgService: ProcessHttpmsgService) { }
  

  getFeedbackes(): Observable<Feedback[]> {
    return this.restangular.all('feedback').getList();
  }
  
  getFeedback(id: number): Observable<Feedback> {
    return  this.restangular.one('feedback',id).get();
  }

  submitFeedback(feedback): Observable<Feedback> {
    return  this.restangular.all('feedback').post(feedback);
  }
  
}
