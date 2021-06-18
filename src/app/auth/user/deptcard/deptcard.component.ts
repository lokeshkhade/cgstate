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
  selector: 'app-deptcard',
  templateUrl: './deptcard.component.html',
  styleUrls: ['./deptcard.component.scss']
})

export class DeptcardComponent implements OnInit {

  public deptcardForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;
  public showwebsite: any = false;
  public showpdf: any = false;
  public showparagraph: any = true;
  events: string[] = [];
  public seletedfolder: any;
  public today = new Date();
  found: any = false;
  fileupload: any = false;
  user_id: any;
  folder_name: any;
  dept_id: any;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.deptcardForm = this.fb.group({
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
    return this.deptcardForm.controls[fieldName].invalid &&
      (this.deptcardForm.controls[fieldName].dirty || this.deptcardForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    console.log(this.dept_id);
    this.dept_foldername = user.dept_foldername;
    this.deptcardForm.patchValue({
      dept_id: this.dept_id
    });

  }

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.deptcardForm.patchValue({
      issuedate: this.datePipe.transform(this.deptcardForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.deptcardForm.patchValue({
      validitydate: this.datePipe.transform(this.deptcardForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }

  onChange(event: any) {
    if (event.value == 'L') { this.showwebsite = true; this.showpdf = false; this.showparagraph = false; }
    if (event.value == 'P') { this.showpdf = true; this.showwebsite = false; this.showparagraph = false; }
    if (event.value == 'D') { this.showparagraph = true; this.showwebsite = false; this.showpdf = false; }
  }

  save(form: NgForm) {

    this.commonservice.insert(form, 'main_card').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Department Details are Entered',
        timer: 5000
      });

    });

    this.deptcardForm.reset();

  }


}
