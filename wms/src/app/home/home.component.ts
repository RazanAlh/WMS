import { Component, OnInit, Inject } from '@angular/core';
import { Workshop } from '../shared/workshop';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  workshops;
  errMess: string;

  constructor(private workshopService: WorkshopService,  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.workshopService.getFinishWorkshop().subscribe(workshops => this.workshops = workshops, errmess => this.errMess = <any>errmess);
    console.log(this.workshops);
  }

}
