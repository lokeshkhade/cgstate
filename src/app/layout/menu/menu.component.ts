import { environment } from './../../../environments/environment';
import { SnackBarService } from './../../services/snack-bar.service';
import { AuthService } from './../../services/auth.service';
import { Menus } from './menu-item';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('close') closeModal: ElementRef;
  @ViewChild('dataContainer', { static: false }) dataContainer: ElementRef;
  public showPassword: boolean = false;
  public selectedPath: any;
  public showInvalid: boolean = false;
  public menus: any = [];
  public loginForm: FormGroup;
  svg: any = [];
  errorText: string;
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private snackBar: SnackBarService, private http: HttpClient) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.menus = Menus;
    this.svgcaptcha();
  }
  svgcaptcha() {
    this.http.get(environment.rootUrl + 'captcha').subscribe(res => {
      this.svg = res;
      this.dataContainer.nativeElement.innerHTML = this.svg.data;
      // this.enqcaptcha = this.svg.text;
    }, error => {
      this.errorText = 'Something bad happened; please try again later.';
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res['success'] == 1) {
          this.closeModal.nativeElement.click();
          console.log(res['role']);
          switch (res['role']) {
            case 1: {
              console.log('loku');
              this.router.navigate(['/user/dashboard']);
              break;
            }
            case '2': {
              this.router.navigate(['']);
              break;
            }
            case '3': {
              console.log(res['role']);
              this.router.navigate(['/admin/dashboard']);
              break;
            }

            default: {
              this.errorText = 'Invalid Username or Password.';
              this.showInvalid = true;
              setTimeout(() => {
                this.showInvalid = false;
              }, 2000);
              this.snackBar.error('please give valid inputs.', '');
              break;
            }

          }

        } else {
          this.snackBar.error(res['message'], '');
          this.errorText = 'Invalid Username or Password.';
          this.showInvalid = true;
          setTimeout(() => {
            this.showInvalid = false;
          }, 5000);
        }
      });
    }
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  
}
