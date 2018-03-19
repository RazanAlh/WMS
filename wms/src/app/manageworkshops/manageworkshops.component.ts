import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workshop } from '../shared/workshop';
import { WorkshopService } from '../services/workshop.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manageworkshops',
  templateUrl: './manageworkshops.component.html',
  styleUrls: ['./manageworkshops.component.scss']
})
export class ManageworkshopsComponent implements OnInit {
  
  workshop: Workshop;
  workshops;
  workshopForm: FormGroup;
  errMess: string;

  formErrors = {
    'name': '',
    'startdate': '',
    'enddate': '',
    'trainer': '',
    'place': '',
    'image': '',
    'description': '',
  };

  validationMessages = {
    'name': {
      'required': 'name  is required.',
      'minlength': 'name must be at least 10 characters long.'
    },
    'trainer': {
      'required': 'trainer  is required.',
      'minlength': 'trainer  must be at least 6 characters long.'
    },
    'place': {
      'required': 'place is required.'
    },
    'image': {
      'required': 'image is required.',
    },
    'description': {
      'required': 'description is required'
    }
  };

  constructor(private workshopService: WorkshopService, private router: Router, private route: ActivatedRoute, private location: Location, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.workshopService.getFutureWorkshop().subscribe(workshops => this.workshops = workshops, errmess => this.errMess = <any>errmess);
    console.log(this.workshops);
  }

  createForm(): void {
    this.workshopForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      trainer: ['', [Validators.required, Validators.minLength(6)]],
      startdate: [''],
      enddate: [''],
      place: ['', [Validators.required, Validators.minLength(4)]],
      image: ['', Validators.required ],
      description: ['', Validators.required ],
      future: true
    });
  }

  
  onValueChanged(data?: any) {
    if (!this.workshopForm) { return; }
    const form = this.workshopForm;
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
    this.workshop = this.workshopForm.value;
    this.workshopService.submitWorkshop(this.workshop).subscribe(workshop => {this.workshop = workshop; alert("workshop Sucsseful Add"); this.router.navigate(['/home']);
    }, errmess => this.errMess = <any>errmess);
  }

  deleteWorkshop(workshopid){
    this.workshopService.deleteWorkshop(workshopid).subscribe(workshop => {this.workshop = workshop; alert("workshop Sucsseful Delete"); this.router.navigate(['/home']);
  }, errmess => this.errMess = <any>errmess);

  }

}