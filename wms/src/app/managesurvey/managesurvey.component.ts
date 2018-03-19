import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey } from '../shared/survey';
import { Question } from '../shared/question';
import { SurveyService } from '../services/survey.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-managesurvey',
  templateUrl: './managesurvey.component.html',
  styleUrls: ['./managesurvey.component.scss']
})

export class ManagesurveyComponent implements OnInit {

  survey: Survey;
  question : Question;
  questionForm: FormGroup;
  surveyForm: FormGroup;
  errMess: string;

  formErrors = {
    'question': '',
  };

  surveyformErrors = {
    'title': '',
  };

  questionvalidationMessages = {
    'question': {
      'required': 'question is required.',
      'minlength': 'question  must be at least 6 characters long.'
    }
  };

  surveyvalidationMessages = {
    'title': {
      'required': 'title is required.',
      'minlength': 'title  must be at least 6 characters long.'
    }
  };

  constructor(private surveyService: SurveyService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {
    this.createquestionForm();
    this.createsurveyForm();
  }

  ngOnInit() {
    let workshopid = + this.route.snapshot.params['id'];
    this.surveyService.getWorkshopSurvey(workshopid).subscribe(survey => { this.survey = survey; 
      if (survey){
        this.surveyForm.patchValue(survey);
      }
      else
      {
        let Survey = {workshopid:workshopid, title:'Work shop Surveys num # ' + workshopid, notes:'', questions:[]}
        this.surveyService.submitSurvey(Survey).subscribe(survey => this.survey = survey, errmess => this.errMess = <any>errmess);
        this.surveyForm.patchValue(survey);
      }
    }, errmess => this.errMess = <any>errmess);
    console.log(this.survey);
  }

  createquestionForm(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required ],
    });
    this.questionForm.valueChanges.subscribe(data => this.onquestionValueChanged(data));
    this.onquestionValueChanged();
  }

  createsurveyForm(): void {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required ],
      notes: ''
    });
    this.surveyForm.valueChanges.subscribe(data => this.onsurveyValueChanged(data));
    this.onsurveyValueChanged();
  }

  
  onquestionValueChanged(data?: any) {
    if (!this.questionForm) { return; }
    const form = this.questionForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.questionvalidationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onsurveyValueChanged(data?: any) {
    if (!this.surveyForm) { return; }
    const form = this.surveyForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.surveyvalidationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  saveQuestion(){
    let maxid = Math.max.apply(Math,this.survey.questions.map(function(o){return o.id;}))
    this.question = this.questionForm.value;
    if (maxid == '-Infinity'){this.question.id = 1} else{this.question.id = maxid + 1;}
    this.survey.questions.push(this.question);
    this.questionForm.reset();
  }

  saveAll() {
    this.surveyService.saveSurvey(this.survey).subscribe(survey => {this.survey = survey; alert("survey Sucsseful Add"); this.router.navigate(['/home']);
    }, errmess => this.errMess = <any>errmess);
    this.router.navigate(['/manageworkshops']);
  }


}