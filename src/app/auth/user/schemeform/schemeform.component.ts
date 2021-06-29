import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from './../../../services/common.service';
import { AuthService } from './../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-schemeform',
  templateUrl: './schemeform.component.html',
  styleUrls: ['./schemeform.component.scss']
})
export class SchemeformComponent implements OnInit {

  public schemeForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;
  public deptlist: any = [];
  public data: any = [];
  public deptdata: any = [];
  user_id: any;
  folder_name: any;
  dept_id: any;

  displayedColumns: string[] = ['sn', 'scheme_name', 'img_link', 'scheme_data', 'scheme_namehn', 'EditData', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private http: HttpClient, private commonservice: CommonService, private fb: FormBuilder, private datePipe: DatePipe, private authservice: AuthService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  isValidInput(fieldName: any): boolean {
    return this.schemeForm.controls[fieldName].invalid &&
      (this.schemeForm.controls[fieldName].dirty || this.schemeForm.controls[fieldName].touched);
  }

  ngOnInit(): void {

    this.schemeForm = this.fb.group({
      dept_id: ['', Validators.required],
      scheme_name: ['', Validators.required],
      scheme_data: ['', Validators.required],
      scheme_desc: ['', Validators.required],
      img_link: [],
      scheme_namehn: ['', Validators.required],
      isactive: ['Y']
    });

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
    this.schemeForm.patchValue({
      dept_id: this.dept_id,
      isactive: 'Y'
    });
    this.getDept();
    this.getAllSchemes();
  }

  //////////////////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getDept() {
    this.commonservice.getFunction('deptlist').subscribe(res => {
      this.deptlist = res;
    });
  }


  upload_SchemePic(event: any) {
    if (event) {
      this.file = event[0];

      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';

      if (this.file.size <= 3072000) {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('folder_name', folder_location);
        this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
          this.filename = res;


          this.schemeForm.patchValue({
            img_link: this.filename.filepath,

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

  save(form: NgForm) {

    this.commonservice.insert(form, 'main_scheme').subscribe(res => {

      Swal.fire({
        icon: 'success',
        text: 'Scheme Details are Entered',
        timer: 5000
      });

    });

    this.schemeForm.reset();

  }





  /////////////////////////////////////////////////////////////////

  getAllSchemes() {
    let index = 0;
    this.commonservice.paramFunction('deptscheme', this.dept_id).subscribe(res => {
      this.data = res;
      this.data.forEach(e => {
        this.data[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  ///////////////////////////////////////////////

}
