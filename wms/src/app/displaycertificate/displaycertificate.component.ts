import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SigninService } from '../services/signin.service';


@Component({
  selector: 'app-displaycertificate',
  templateUrl: './displaycertificate.component.html',
  styleUrls: ['./displaycertificate.component.scss']
})
export class DisplaycertificateComponent implements OnInit {

  profiles;
  users;
  errMess: string;

  constructor(private signinService: SigninService, private router: Router,  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    if (localStorage.getItem('wmslogin')) {
      let userid = Number(localStorage.getItem('wmslogin'));
      this.signinService.getUser(userid).subscribe(users => { 
         this.users = users;
         console.log(this.users);
      }, errmess => this.errMess = <any>errmess);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
