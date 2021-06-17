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

      linkname: ['', Validators.required],
      linkurl: ['', Validators.required],
      dept_id: [],
      isactive: ['Y'],
      imagetype: []

    });


  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
    this.bannerForm.patchValue({ dept_id: this.dept_id });
  }

  fileChangeEvent(event: any): void {
    this.cropped = false;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  getimagetype(event: any) {
    this.imagetype = event.value;
  }

  upload() {
    const folder_location = './uploads/' + this.dept_foldername + '/' + 'banner' + '/';
    let formData = {
      'folder_name': folder_location,
      'baseImage': this.croppedImage
    }
    this.http.post(environment.rootUrl + 'upload/uploadBase', formData).subscribe((res: any) => {
      this.filename = res;
      this.bannerForm.patchValue({
        linkurl: this.filename.filepath,
        imagetype: this.pictype
      });
      Swal.fire({
        icon: 'success',
        text: 'File Uploaded.',
        timer: 2000
      });
    });
  }

  save(form: NgForm) {

    this.commonservice.insert(form, 'main_banner').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Department Details are Entered',
        timer: 5000
      });

    });

    this.bannerForm.reset();

  }

}
