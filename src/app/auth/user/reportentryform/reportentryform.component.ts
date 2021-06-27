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
  selector: 'app-reportentryform',
  templateUrl: './reportentryform.component.html',
  styleUrls: ['./reportentryform.component.scss']
})
export class ReportentryformComponent implements OnInit {

  public seletedfolder: any;
  public menu_code: any;
  public uploadmenu: any = [];
  public today = new Date();
  found: any = false;
  fileupload: any = false;
  file: any = File;
  filename: any;
  user_id: any;
  folder_name: any;
  public dept_foldername: any;
  public dept_id: any;

  events: string[] = [];
  reportForm: FormGroup;

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

    this.reportForm = this.fb.group({

      menu_code: ['', Validators.required],
      linkname: ['', Validators.required],
      dept_id: [],
      menu_tab_linkurl: [''],
      isactive: ['Y'],
      issuedate: [],
      validitydate: []

    });
  }
  isValidInput(fieldName: any): boolean {
    return this.reportForm.controls[fieldName].invalid &&
      (this.reportForm.controls[fieldName].dirty || this.reportForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
    this.getMenu();
  }

  save(form: NgForm) {

    this.commonservice.insert(form, 'main_reports').subscribe(res => {
      Swal.fire({
        icon: 'success',
        text: 'Data Saved',
        timer: 2000
      });
      this.router.navigate(['user/reportentryform']);
    });
  }

  getFolderName(event: any) {

    this.seletedfolder = event.value.foldername;
    this.menu_code = event.value.menu_code;

    //this.reportForm.patchValue({menu_code:event.value.menu_code})
  }

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.reportForm.patchValue({
      issuedate: this.datePipe.transform(this.reportForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.reportForm.patchValue({
      validitydate: this.datePipe.transform(this.reportForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }

  getMenu() {
    this.commonservice.getFunction('reportmenu').subscribe(res => {
      this.uploadmenu = res;
    }
    );
  }


  upload(event: any) {
    if (event) {
      this.file = event[0];
      const folder_location = './uploads/' + this.dept_foldername + '/' + this.seletedfolder + '/';
      if (this.file.type == "application/pdf") {
        if (this.file.size <= 30720000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.reportForm.patchValue({
              menu_tab_linkurl: this.filename.filepath,
              menu_code: this.menu_code,
              dept_id: this.dept_id,
              isactive: ['Y']
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

}
