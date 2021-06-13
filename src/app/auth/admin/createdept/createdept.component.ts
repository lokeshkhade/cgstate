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
  selector: 'app-createdept',
  templateUrl: './createdept.component.html',
  styleUrls: ['./createdept.component.scss']
})
export class CreatedeptComponent implements OnInit {
  public createdeptForm: FormGroup;

  constructor(private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.createdeptForm = this.fb.group({
      deptname_en: ['', Validators.required],
      deptname_hn: ['', Validators.required],
      domain_name: ['', Validators.required]
    });

  }

  isValidInput(fieldName: any): boolean {
    return this.createdeptForm.controls[fieldName].invalid &&
      (this.createdeptForm.controls[fieldName].dirty || this.createdeptForm.controls[fieldName].touched);
  }


  ngOnInit(): void {

  }

  save(form: NgForm) {

    this.commonservice.createdept(form, 'mas_dept').subscribe(res => {
      this.commonservice.paramFunction('userid', res).subscribe(res => {
        // alert('You UserID is:'+res[0].user_id);
        Swal.fire({
          icon: 'success',
          text: 'You UserID is:' + res[0].user_id,
          timer: 5000
        });
      });
    });
    this.createdeptForm.reset();
  }

}
