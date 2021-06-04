import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  constructor(private service: CommonService, private fb: FormBuilder) {
    this.regForm = this.fb.group({
      ApplicantName: ['', Validators.required],
      FirmName: ['', Validators.required],
      Constitutiontype: ['', Validators.required],
      Premisestype: ['', Validators.required],
      CState: ['', Validators.required],
      CDistrict: ['', Validators.required],
      CBlock: ['', Validators.required],
      Website: [''],
      CPincode: ['', Validators.required],
      PhoneNo: [''],
      FaxNo: [''],
      MobileNo: ['', Validators.required],
      EmailID: ['', [Validators.required, Validators.email]],
      CAddress: ['', Validators.required],
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  isValidInput(fieldName: any): boolean {
    return this.regForm.controls[fieldName].invalid &&
      (this.regForm.controls[fieldName].dirty || this.regForm.controls[fieldName].touched);
  }
  ngOnInit(): void {
  }
  onSubmit() {

  }
}
