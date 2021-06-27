import { CommonService } from './../../services/common.service';
import { SnackBarService } from './../../services/snack-bar.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser: any;
  changePassworform: FormGroup;
  result: any;
  constructor(private authService: AuthService, private fb: FormBuilder, private snackBar: SnackBarService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.changePassworform = this.fb.group({
      user_id: [this.currentUser.user_id],
      role: [this.currentUser.role],
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      re_password: ['', Validators.required]
    }, {
      validator: this.confirmedValidator('new_password', 're_password')
    });
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  isValidInput(fieldName: any): boolean {
    return this.changePassworform.controls[fieldName].invalid &&
      (this.changePassworform.controls[fieldName].dirty || this.changePassworform.controls[fieldName].touched);
  }
  change() {
    if (this.changePassworform.valid) {
      this.commonService.updateFuction('changePassword', this.changePassworform.value).subscribe((res: any) => {
        this.result = res;
        if (this.result.success) {
          this.snackBar.success('पासवर्ड सफलता पूर्वक बदला गया', '');
          this.authService.logout();
        } else {
          this.snackBar.error(this.result.message, '');
        }
      }, (error: any) => {
        this.snackBar.error('Some error occured.', '');
      });
    } else {
      this.snackBar.error('कृपया सही जानकारी इन्द्रज करें|', '');
    }
  }

}
