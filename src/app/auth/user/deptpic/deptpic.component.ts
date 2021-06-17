import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../services/common.service';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-deptpic',
  templateUrl: './deptpic.component.html',
  styleUrls: ['./deptpic.component.scss']
})
export class DeptpicComponent implements OnInit {

  public bannerForm: FormGroup;
  public imagetype: any;

  file: any = File;
  filename: any;
  dept_id: any;
  user_id: any;
  public dept_foldername: any;
  public pictype: any;
  public deptdata: any = [];
  imageChangedEvent: any;
  croppedImage: any;
  public cropped = false;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.bannerForm = this.fb.group({

      linkurl: ['', Validators.required],
      imagetitle_en: ['', Validators.required],
      imagetitle_hn: ['', Validators.required],
      dept_id: [],
      isactive: ['Y'],
      imagetype: []
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.bannerForm.controls[fieldName].invalid &&
      (this.bannerForm.controls[fieldName].dirty || this.bannerForm.controls[fieldName].touched);
  }


  ngOnInit(): void {
    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
  }

  getimagetype(event: any) {
    this.imagetype = event.value;
  }

  upload_Picture(event: any) {
    if (event) {
      this.file = event[0];

      const folder_location = './uploads/' + this.dept_foldername + '/' + 'banner' + '/';

      if (this.file.size <= 3072000) {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('folder_name', folder_location);
        this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
          this.filename = res;

          this.bannerForm.patchValue({
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
          text: 'Picture size should be less than 300KB.'
        });
        this.file = null;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Only jpeg/png file accepted.'
      });
      this.file = null;
    }
  }




  save(form: NgForm) {

    this.commonservice.insert(form, 'main_banner').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Data are Entered',
        timer: 5000
      });

    });

    this.bannerForm.reset();

  }

}
