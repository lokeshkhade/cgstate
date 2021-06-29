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
  selector: 'app-whatsnew',
  templateUrl: './whatsnew.component.html',
  styleUrls: ['./whatsnew.component.scss']
})
export class WhatsnewComponent implements OnInit {

  public mainnewsForm: FormGroup;
  file: any = File;
  filename: any;
  public dept_foldername: any;
  public showwebsite: any = true;
  public showpdf: any = false;
  public showimage: any = false;
  events: string[] = [];
  public seletedfolder: any;
  public today = new Date();
  found: any = false;
  fileupload: any = false;
  user_id: any;
  folder_name: any;
  dept_id: any;
  public data: any = [];
  public deptdata: any = [];

  displayedColumns: string[] = ['sn', 'linkname', 'linkurl', 'EditData', 'action'];
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

    this.mainnewsForm = this.fb.group({
      linkname: ['', Validators.required],
      linkurl: ['', Validators.required],
      issuedate: [],
      dept_id: [],
      id: [],
      validitydate: [],
      isactive: ['Y'],
      doctype: []
    });

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;
    this.mainnewsForm.patchValue({
      dept_id: this.dept_id,
      isactive: 'Y'
    });

    this.getNews();
  }

  ////////////////////////////////////////////////

  isValidInput(fieldName: any): boolean {
    return this.mainnewsForm.controls[fieldName].invalid &&
      (this.mainnewsForm.controls[fieldName].dirty || this.mainnewsForm.controls[fieldName].touched);
  }

  ////////////////////////////////////////////

  ngOnInit(): void {
    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    console.log(this.dept_id);
    this.dept_foldername = user.dept_foldername;
    this.mainnewsForm.patchValue({
      dept_id: this.dept_id,
      isactive: 'Y'
    });
  }

  /////////////////////////////////////////////////

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.mainnewsForm.patchValue({
      issuedate: this.datePipe.transform(this.mainnewsForm.get("issuedate")?.value, "yyyy-MM-dd")
    });

  }

  /////////////////////////////////////////////////////////////////////

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.mainnewsForm.patchValue({
      validitydate: this.datePipe.transform(this.mainnewsForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }

  /////////////////////////////////////////////////////////////////

  upload(event: any) {

    if (event) {
      this.file = event[0];

      this.seletedfolder = 'mainnews';
      const folder_location = './uploads/' + this.dept_foldername + '/' + this.seletedfolder + '/';

      if (this.file.type == "application/pdf") {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.mainnewsForm.patchValue({
              linkurl: this.filename.filepath,
              dept_id: this.dept_id,
              isactive: 'Y'
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

  //////////////////////////////////////////////////////

  upload_Image(event: any) {
    if (event) {
      this.file = event[0];
      const folder_location = './uploads/' + this.dept_foldername + '/' + 'images' + '/';
      if (this.file.type == 'image/png' || this.file.type == 'image/jpeg') {
        if (this.file.size <= 30720000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;
            this.mainnewsForm.patchValue({
              linkurl: this.filename.filepath,
              dept_id: this.dept_id,
              isactive: 'Y'
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
          text: 'Only png/jpeg file accepted.'
        });
        this.file = null;
      }
    }

  }

  ///////////////////////////////////////

  onChange(event: any) {
    if (event.value == 'L') { this.showwebsite = true; this.showpdf = false; this.showimage = false; }
    if (event.value == 'P') { this.showpdf = true; this.showwebsite = false; this.showimage = false; }
    if (event.value == 'I') { this.showimage = true; this.showwebsite = false; this.showpdf = false; }
  }


  // onChange(event: any) {
  //   if (event.value == 'L') { this.showwebsite = true; this.showpdf = false; }
  //   if (event.value == 'P') { this.showpdf = true; this.showwebsite = false; }
  // }


  //////////////////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /////////////////////////////////////////////////////////////////

  EditDept(id: any) {
    this.commonservice.paramFunction('idwhatnew', id).subscribe(res => {
      this.deptdata = res[0];
      this.mainnewsForm.patchValue({
        id: this.deptdata.id,
        linkname: this.deptdata.linkname,
        linkurl: this.deptdata.linkurl,
        // issuedate: this.deptdata.issuedate,
        // validitydate: this.deptdata.validitydate,
        dept_id: this.deptdata.dept_id,
        isactive: this.deptdata.isactive,
        doctype: this.deptdata.doctype
      });
    });
  }

  ///////////////////////////////////////////////////

  save(form: NgForm) {
    console.log(form["id"]);
    if (form["id"] == null) {
      this.commonservice.insert(form, 'main_news').subscribe(res => {
        if (res['affectedRows']) {
          Swal.fire({
            icon: 'success',
            text: '"Whats New" Details are Entered',
            timer: 5000
          });
        }
      });
      this.getNews();
      this.router.navigate(['user/whatsnew']);
    }
    else {
      this.commonservice.updatedata(form, 'main_news').subscribe(res => {
        if (res['affectedRows']) {
          Swal.fire({
            icon: 'success',
            text: '"Whats New" Details are Updated',
            timer: 5000
          });
        }
      })
      this.getNews();
    }
    this.router.navigate(['user/whatsnew']);
  }

  ///////////////////////////////////////////////////

  slideChange(id: any, checked) {
    console.log(checked);
    let body = {
      id: id,
      isactive: ['N']
    }
    this.commonservice.updatedata(body, 'main_news').subscribe(res => {
      if (res['affectedRows']) {
        Swal.fire({
          icon: 'success',
          text: 'Data Disable',
          timer: 5000
        });
        this.getNews();
      }
    });
  }

  ////////////////////////////////////////////


  getNews() {
    let index = 0;
    this.commonservice.paramFunction('allwhatnew', this.dept_id).subscribe(res => {
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

  //////////////////////////////////////////////////////

}
