import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import { User } from '../shared/user';
import { Profile } from '../shared/profile';

@Injectable()
export class SigninService {

  constructor(private restangular: Restangular, private ProcessHttpmsgService: ProcessHttpmsgService) { }
  

  getUseres(): Observable<User[]> {
    return this.restangular.all('users').getList();
  }
  
  getUser(id: number): Observable<User> {
    return  this.restangular.one('users',id).get();
  }

  submitUser(User): Observable<User> {
    return  this.restangular.all('users').post(User);
  }

  getLogin(username: string, password:string): Observable<User> {
    return  this.restangular.one('users').get({username: username, password:password}).map(user => user[0]);
  }

  getProfiles(userid: string): Observable<Profile> {
    return  this.restangular.one('profiles').get({userid: userid}).map(profile => profile[0]);
  }
  
}
