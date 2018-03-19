import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey } from '../shared/survey';
import { Question } from '../shared/question';
import { Result } from '../shared/result';

import { SurveyService } from '../services/survey.service';
import { SurveyresultsService } from '../services/surveyresults.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-displaysurvey',
  templateUrl: './displaysurvey.component.html',
  styleUrls: ['./displaysurvey.component.scss']
})
export class DisplaysurveyComponent implements OnInit {

  survey: Survey;
  question : Question;
  questionForm: FormGroup;
  errMess: string;
  results = Result;
  questionresults = [];
  surveyresults;

  constructor(private surveyresultsService: SurveyresultsService, private surveyService: SurveyService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {
    
  }

  ngOnInit() {
    let workshopid = + this.route.snapshot.params['id'];
    this.surveyService.getWorkshopSurvey(workshopid).subscribe(survey => { this.survey = survey; 
      if (survey){
      }
      else
      {
        alert('no data');
      }
    }, errmess => this.errMess = <any>errmess);
  }

  addquestion(resultid, questionid){
    let qres = {questionid:questionid, result:resultid.value}
    let questionresultrec = this.questionresults.find(questions => questions.id === questionid);
    if (questionresultrec) {
      const index: number = this.questionresults.indexOf(questionresultrec);
      this.questionresults.splice(index,1);
      this.questionresults.push(qres);
    }
    else{
      this.questionresults.push(qres);
    }
    console.log(this.questionresults);
  }

  
  saveAll() {
    if (localStorage.getItem('wmslogin')) {
      let userid = localStorage.getItem('wmslogin');
      this.surveyresults = {surveyid:this.survey.id, userid:userid, results: this.questionresults}
      this.surveyresultsService.submitSurveyresults(this.surveyresults).subscribe(surveyresults => {this.surveyresults = surveyresults; alert("survey Sucsseful Add"); this.router.navigate(['/home']);
      }, errmess => this.errMess = <any>errmess);
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }


}