import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

user = {username: '', password: '', remember: false};

serveruser;

errMess;


constructor(private signinService: SigninService, private router: Router, public dialogRef: MdDialogRef<LoginComponent>) { }

  ngOnInit() {

  }

  onSubmit() {
    this.signinService.getLogin(this.user.username, this.user.password).subscribe(users => {this.serveruser = users; localStorage.setItem('wmslogin', this.serveruser.id); this.router.navigate(['/home']);
  }, errmess => this.errMess = <any>errmess);
    this.dialogRef.close();
  }

  test(){
    
    console.log(this.serveruser);
    console.log('this.serveruser');
  }

}