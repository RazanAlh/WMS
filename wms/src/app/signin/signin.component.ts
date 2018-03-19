import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { SigninService } from '../services/signin.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User;
  signinForm: FormGroup;
  errMess: string;

  formErrors = {
    'username': '',
    'password': '',
    'email': '',
    'mobile': '',
    'workplace': '',
  };

  validationMessages = {
    'username': {
      'required': 'username  is required.',
      'minlength': 'username must be at least 10 characters long.'
    },
    'password': {
      'required': 'password  is required.',
      'minlength': 'password  must be at least 6 characters long.'
    },
    'email': {
      'required': 'email is required.'
    },
    'mobile': {
      'required': 'mobile is required.',
    },
    'workplace': {
      'required': 'workplace is required'
    }
  };

  constructor(private signinService: SigninService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {

  }

  createForm(): void {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', Validators.required ],
      workplace: ['', Validators.required ]
    });
  }

  
  onValueChanged(data?: any) {
    if (!this.signinForm) { return; }
    const form = this.signinForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.user = this.signinForm.value;
    console.log(this.user);
    this.signinService.submitUser(this.user).subscribe(user => {this.user = user; alert("Signin Sucsseful"); this.router.navigate(['/home']);
  }, errmess => this.errMess = <any>errmess);
  }

}