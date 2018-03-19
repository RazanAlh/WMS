import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { Workshop } from '../shared/workshop';
@Injectable()
export class WorkshopService {

  constructor(private restangular: Restangular, private ProcessHttpmsgService: ProcessHttpmsgService) { }
  

  getWorkshopes(): Observable<Workshop[]> {
    return this.restangular.all('workshops').getList();
  }
  
  getWorkshop(id: number): Observable<Workshop> {
    return  this.restangular.one('workshops',id).get();
  }

  getFinishWorkshop(): Observable<Workshop> {
    return this.restangular.all('workshops').getList({future: false});
  }

  getFutureWorkshop(): Observable<Workshop> {
    return this.restangular.all('workshops').getList({future: true})
  }


  submitWorkshop(Workshop): Observable<Workshop> {
    return  this.restangular.all('workshops').post(Workshop);
  }

  deleteWorkshop(id: number): Observable<Workshop> {
    return  this.restangular.one('workshops',id).remove();
  }

}
