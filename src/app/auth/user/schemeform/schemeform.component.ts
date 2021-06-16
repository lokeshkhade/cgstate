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
  selector: 'app-schemeform',
  templateUrl: './schemeform.component.html',
  styleUrls: ['./schemeform.component.scss']
})
export class SchemeformComponent implements OnInit {

  public schemeForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.schemeForm = this.fb.group({

      scheme_name: [],
      scheme_data: [],
      img_link: [],
      scheme_namehn: []
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.schemeForm.controls[fieldName].invalid &&
      (this.schemeForm.controls[fieldName].dirty || this.schemeForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;

    this.dept_foldername = user.dept_foldername;


  }



  upload_SchemePic(event: any) {
    if (event) {
      this.file = event[0];

      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';

      if (this.file.size <= 3072000) {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('folder_name', folder_location);
        this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
          this.filename = res;


          this.schemeForm.patchValue({
            img_link: this.filename.filepath,

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

    this.commonservice.insert(form, 'main_scheme').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Scheme Details are Entered',
        timer: 5000
      });

    });

    this.schemeForm.reset();

  }

}
