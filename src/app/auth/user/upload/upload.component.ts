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
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

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
  uploadForm: FormGroup;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.uploadForm = this.fb.group({

      menu_code: ['', Validators.required],
      linkname: ['', Validators.required],
      dept_id: [],
      menu_tab_linkurl: [''],
      issuedate: [],
      validitydate: []

    });
  }

  isValidInput(fieldName: any): boolean {
    return this.uploadForm.controls[fieldName].invalid &&
      (this.uploadForm.controls[fieldName].dirty || this.uploadForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;

    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
    this.getMenu();
  }

  save(form: NgForm) {

    this.commonservice.insert(form, 'upload_data').subscribe(res => {
      Swal.fire({
        icon: 'success',
        text: 'Data Saved',
        timer: 2000
      });
    });
  }

  getFolderName(event: any) {

    this.seletedfolder = event.value.foldername;
    this.menu_code = event.value.menu_code;

    //this.uploadForm.patchValue({menu_code:event.value.menu_code})
  }

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.uploadForm.patchValue({
      issuedate: this.datePipe.transform(this.uploadForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.uploadForm.patchValue({
      validitydate: this.datePipe.transform(this.uploadForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }

  getMenu() {
    this.commonservice.getFunction('uploadmenu').subscribe(res => {
      this.uploadmenu = res;
    }
    );
  }


  upload(event: any) {
    if (event) {
      this.file = event[0];
      const folder_location = './uploads/' + this.dept_foldername + '/' + this.seletedfolder + '/';
      if (this.file.type == "application/pdf") {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.uploadForm.patchValue({
              menu_tab_linkurl: this.filename.filepath,
              menu_code: this.menu_code,
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



}
