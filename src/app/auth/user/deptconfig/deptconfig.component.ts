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
  selector: 'app-deptconfig',
  templateUrl: './deptconfig.component.html',
  styleUrls: ['./deptconfig.component.scss']
})
export class DeptconfigComponent implements OnInit {

  public deptconfigForm: FormGroup;
  user_id: any;
  dept_id: any;
  file: any = File;
  public deptdata: any = [];
  public dept_foldername: any;
  filename: any;
  cm_post_en: any;
  cm_post_hn: any;
  dept_post_hn: any;
  dept_post_en: any;
  public lable: any;
  cmpreviewimg: any;
  dmpreviewimg: any;
  dlpreviewimg: any;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.deptconfigForm = this.fb.group({
      deptname_en: ['', Validators.required],
      deptname_hn: ['', Validators.required],
      dept_minister_name_en: ['', Validators.required],
      dept_minister_name_hn: ['', Validators.required],
      dept_minister_post_en: ['', Validators.required],
      dept_minister_post_hn: ['', Validators.required],
      dept_min_pic: [],
      deptlogo_dark_url: [],
      cm_name_en: ['', Validators.required],
      cm_name_hn: ['', Validators.required],
      cm_post_en: ['', Validators.required],
      cm_post_hn: ['', Validators.required],
      cm_pic_url: [],
      dept_id: []

    });
  }

  isValidInput(fieldName: any): boolean {
    return this.deptconfigForm.controls[fieldName].invalid &&
      (this.deptconfigForm.controls[fieldName].dirty || this.deptconfigForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
    this.deptconfigForm.patchValue({ dept_id: this.dept_id });

    if (this.user_id == 101) {

      this.lable = 'Governor';
    }
    else { this.lable = 'Department Minister'; }

    this.getDeptData();
  }

  getDeptData() {
    this.commonservice.paramFunction('dept', this.dept_id).subscribe(res => {
      this.deptdata = res[0];
      this.deptconfigForm.patchValue({
        deptname_en: this.deptdata.deptname_en,
        deptname_hn: this.deptdata.deptname_hn,
        dept_minister_name_en: this.deptdata.dept_minister_name_en,
        dept_minister_name_hn: this.deptdata.dept_minister_name_hn,
        dept_minister_post_en: this.deptdata.dept_minister_post_en,
        dept_minister_post_hn: this.deptdata.dept_minister_post_hn,
        cm_name_en: this.deptdata.cm_name_en,
        cm_name_hn: this.deptdata.cm_name_hn,
        cm_post_en: this.deptdata.cm_post_en,
        cm_post_hn: this.deptdata.cm_post_hn,
        dept_min_pic: this.deptdata.dept_min_pic,
        deptlogo_dark_url: this.deptdata.deptlogo_dark_url,
        cm_pic_url: this.deptdata.cm_pic_url
      });
      this.dmpreviewimg = environment.rootUrl + this.deptdata.dept_min_pic;
      this.dlpreviewimg = environment.rootUrl + this.deptdata.deptlogo_dark_url;
      this.cmpreviewimg = environment.rootUrl + this.deptdata.cm_pic_url;
    });
  }

  update(form: NgForm) {
    this.commonservice.update(form, 'mas_dept').subscribe(res => {
      Swal.fire({
        icon: 'success',
        text: 'Data Saved',
        timer: 2000
      });
    });
  }

  upload_CMPIC(event: any) {
    console.log(event);

    if (event) {
      this.file = event[0];
      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';
      if (this.file.type == 'image/png') {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);

          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.cmpreviewimg = environment.rootUrl + this.filename.filepath
            this.deptconfigForm.patchValue({
              cm_pic_url: this.filename.filepath,
              dept_id: this.dept_id
            });

            Swal.fire({
              icon: 'success',
              text: 'File Uploaded.',
              timer: 2000
            });
          });

        } else {
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
    } else {
      this.cmpreviewimg = null;
    }
  }

  upload_DMPIC(event: any) {
    if (event) {
      this.file = event[0];
      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';
      if (this.file.type == 'image/png') {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;
            this.dmpreviewimg = environment.rootUrl + this.filename.filepath;
            this.deptconfigForm.patchValue({
              dept_min_pic: this.filename.filepath,
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
            text: 'Image size should be less than 300KB.'
          });
          this.file = null;
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Only jpg/png file accepted.'
        });
        this.file = null;
      }
    }
    else {
      this.dmpreviewimg = null;
    }
  }

  upload_DLOGO(event: any) {
    if (event) {
      this.file = event[0];
      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';
      if (this.file.type == 'image/png') {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;
            this.dlpreviewimg = environment.rootUrl + this.filename.filepath;
            this.deptconfigForm.patchValue({
              deptlogo_dark_url: this.filename.filepath,
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
    else {
      this.dlpreviewimg = null;
    }
  }
}
