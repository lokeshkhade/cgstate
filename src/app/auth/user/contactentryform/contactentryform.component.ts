import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../services/common.service';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-contactentryform',
  templateUrl: './contactentryform.component.html',
  styleUrls: ['./contactentryform.component.scss']
})
export class ContactentryformComponent implements OnInit {

  public deptcontactForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;
  public showwebsite: any = true;
  public showpdf: any = false;
  public showdata: any = false;
  events: string[] = [];
  public seletedfolder: any;
  public today = new Date();
  found: any = false;
  fileupload: any = false;
  user_id: any;
  folder_name: any;
  dept_id: any;

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

  }


  ngOnInit(): void {
    this.deptcontactForm = this.fb.group({
      linkname: [],
      linkurl: [],
      issuedate: [],
      validitydate: [],
      data: [],
      dept_id: [],
      isactive: ['Y'],
      flag: []
    });

  }

  ngAfterViewInit() {
    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;

    this.deptcontactForm.patchValue({
      dept_id: this.dept_id,
      isactive: 'Y'

    });
  }


  isValidInput(fieldName: any): boolean {
    return this.deptcontactForm.controls[fieldName].invalid &&
      (this.deptcontactForm.controls[fieldName].dirty || this.deptcontactForm.controls[fieldName].touched);
  }

  upload(event: any) {

    if (event) {
      this.file = event[0];

      this.seletedfolder = 'deptaboutus';
      const folder_location = './uploads/' + this.dept_foldername + '/' + this.seletedfolder + '/';

      if (this.file.type == "application/pdf") {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.deptcontactForm.patchValue({
              linkurl: this.filename.filepath,
              dept_id: this.dept_id
            });

            Swal.fire({
              icon: 'success',
              text: 'File Uploaded.',
              timer: 2000
            });
          });

        }
        else {
          Swal.fire({
            icon: 'error',
            text: 'Pdf size should be less than 300KB.'
          });
          this.file = null;
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Only Pdf file accepted.'
        });
        this.file = null;
      }
    }
  }

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.deptcontactForm.patchValue({
      issuedate: this.datePipe.transform(this.deptcontactForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.deptcontactForm.patchValue({
      validitydate: this.datePipe.transform(this.deptcontactForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }

  onChange(event: any) {
    if (event.value == 'L') { this.showwebsite = true; this.showpdf = false; this.showdata = false; }
    if (event.value == 'P') { this.showpdf = true; this.showwebsite = false; this.showdata = false; }
    if (event.value == 'D') { this.showdata = true; this.showwebsite = false; this.showpdf = false; }
  }


  save(form: NgForm) {

    console.log(form);
    this.commonservice.insert(form, 'main_contact').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Department About Us Details are Entered',
        timer: 5000
      });
      this.router.navigate(['user/contactentryform']);
    });

  }

}
