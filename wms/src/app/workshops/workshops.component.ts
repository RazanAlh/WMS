import { Component, OnInit, Inject } from '@angular/core';
import { Workshop } from '../shared/workshop';
import { WorkshopService } from '../services/workshop.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {

  workshops;
  profiles;
  errMess: string;

  constructor(private signinService: SigninService, private workshopService: WorkshopService, private router: Router,  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.workshopService.getFutureWorkshop().subscribe(workshops => this.workshops = workshops, errmess => this.errMess = <any>errmess);
    console.log(this.workshops);
  }

  makeSurveys(workshopid){
    if (localStorage.getItem('wmslogin')) {
      let userid = localStorage.getItem('wmslogin');
      this.signinService.getProfiles(userid).subscribe(profiles => { 
         this.profiles = profiles;
         let workshops = this.profiles.workshops.find(workshop => workshop === workshopid);
         if (workshops) {
          this.router.navigate(['/displaysurvey', workshopid]);
         }
         else 
         {
           alert('Not register in this workshop');
          this.router.navigate(['/home']);
         }
      }, errmess => this.errMess = <any>errmess);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

}
