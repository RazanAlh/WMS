import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  submitfeedback : Feedback;
  contactType = ContactType;
  errMess: string;
  submitfeedbackspinner = true;


  constructor(private feedbackService : FeedbackService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback).subscribe(feedback => {this.submitfeedback = feedback; console.log(this.submitfeedback);}, errmess => this.errMess = <any>errmess);
    this.feedbackForm.reset({firstname: '', lastname:'', telnum: '', email: '', agree:false, contacttype: 'None',  message: ''});
    this.router.navigate(['/home']);
  }

}