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

@Component({
  selector: 'app-departmententryform',
  templateUrl: './departmententryform.component.html',
  styleUrls: ['./departmententryform.component.scss']
})

export class DepartmententryformComponent implements OnInit {

  public deptentryForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.deptentryForm = this.fb.group({
      deptname_hn: ['', Validators.required],
      deptname_en: ['', Validators.required],
      officeaddress: ['', Validators.required],
      websitelink: ['', Validators.required],
      logourl: [],
      contactno: ['', Validators.required],
      display: ['O'],
      isactive: ['Y']
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.deptentryForm.controls[fieldName].invalid &&
      (this.deptentryForm.controls[fieldName].dirty || this.deptentryForm.controls[fieldName].touched);
  }


  ngOnInit(): void {

    let user = this.authservice.currentUser;
    this.dept_foldername = user.dept_foldername;
  }



  upload_DeptLogo(event: any) {
    if (event) {
      this.file = event[0];

      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';

      if (this.file.size <= 3072000) {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('folder_name', folder_location);
        this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
          this.filename = res;


          this.deptentryForm.patchValue({
            logourl: this.filename.filepath,

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
          text: 'PNG size should be less than 300KB.'
        });
        this.file = null;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Only png file accepted.'
      });
      this.file = null;
    }
  }



  save(form: NgForm) {

    this.commonservice.insert(form, 'main_department').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Department Details are Entered',
        timer: 5000
      });

    });

    this.deptentryForm.reset();

  }


}
