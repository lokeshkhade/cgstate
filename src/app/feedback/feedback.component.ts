import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {


  public feedbackForm: FormGroup;
  events: string[] = [];

  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      issuedate: [],
      message: ['', Validators.required],
      contactno: ['', Validators.required],
      emailid: ['', Validators.required]
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.feedbackForm.controls[fieldName].invalid &&
      (this.feedbackForm.controls[fieldName].dirty || this.feedbackForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;

    this.feedbackForm.patchValue({

    });
  }

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.feedbackForm.patchValue({
      issuedate: this.datePipe.transform(this.feedbackForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  save(form: NgForm) {

    this.commonservice.insert(form, 'main_feedback').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Details are Entered',
        timer: 5000
      });

      this.router.navigate(['/feedback']);

    });



  }

}
