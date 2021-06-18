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
  selector: 'app-implinkform',
  templateUrl: './implinkform.component.html',
  styleUrls: ['./implinkform.component.scss']
})
export class ImplinkformComponent implements OnInit {


  public implinkForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;
  public showwebsite: any = true;
  public showpdf: any = false;
  events: string[] = [];
  public seletedfolder: any;
  public today = new Date();
  found: any = false;
  fileupload: any = false;
  user_id: any;
  folder_name: any;
  dept_id: any;


  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {


    this.implinkForm = this.fb.group({
      linkname: ['', Validators.required],
      linkurl: ['', Validators.required],
      issuedate: [],
      dept_id: [],
      validitydate: [],
      isactive: ['Y'],
      doctype: []
    });

  }

  isValidInput(fieldName: any): boolean {
    return this.implinkForm.controls[fieldName].invalid &&
      (this.implinkForm.controls[fieldName].dirty || this.implinkForm.controls[fieldName].touched);
  }


  ngOnInit(): void {

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    console.log(this.dept_id);
    this.dept_foldername = user.dept_foldername;
    this.implinkForm.patchValue({
      dept_id: this.dept_id
    });
  }

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.implinkForm.patchValue({
      issuedate: this.datePipe.transform(this.implinkForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.implinkForm.patchValue({
      validitydate: this.datePipe.transform(this.implinkForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }



  upload(event: any) {

    if (event) {
      this.file = event[0];

      this.seletedfolder = 'impinfo';
      const folder_location = './uploads/' + this.dept_foldername + '/' + this.seletedfolder + '/';

      if (this.file.type == "application/pdf") {
        if (this.file.size <= 307200) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.implinkForm.patchValue({
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

  save(form: NgForm) {

    this.commonservice.insert(form, 'main_importantlink').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Department Details are Entered',
        timer: 5000
      });

    });

    this.implinkForm.reset();

  }

  onChange(event: any) {
    if (event.value == 'L') { this.showwebsite = true; this.showpdf = false; }
    if (event.value == 'P') { this.showwebsite = false; this.showpdf = true; }

  }


}
