import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from './../../../services/common.service';
import { AuthService } from './../../../services/auth.service';
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
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-downloadentryform',
  templateUrl: './downloadentryform.component.html',
  styleUrls: ['./downloadentryform.component.scss']
})

export class DownloadentryformComponent implements OnInit {

  public downloadForm: FormGroup;
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
  }

  ///////////////////////////////////////////////////////

  isValidInput(fieldName: any): boolean {
    return this.downloadForm.controls[fieldName].invalid &&
      (this.downloadForm.controls[fieldName].dirty || this.downloadForm.controls[fieldName].touched);
  }

  ///////////////////////////////////////////////

  ngOnInit(): void {

    this.downloadForm = this.fb.group({
      linkname: [],
      linkurl: [],
      issuedate: [],
      validitydate: [],
      dept_id: [],
      id: [],
      isactive: ['Y'],
      doctype: []
    });

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;

    this.downloadForm.patchValue({
      dept_id: this.dept_id,
      isactive: 'Y'
    });

    this.getAllDownloads();

  }

  /////////////////////////////////////////

  addissuedate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.downloadForm.patchValue({
      issuedate: this.datePipe.transform(this.downloadForm.get("issuedate")?.value, "yyyy-MM-dd")
    });
  }

  /////////////////////////////////////////////////////////

  addvaliditydate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    this.downloadForm.patchValue({
      validitydate: this.datePipe.transform(this.downloadForm.get("validitydate")?.value, "yyyy-MM-dd")
    });
  }

  //////////////////////////////////////////

  upload(event: any) {

    if (event) {
      this.file = event[0];

      this.seletedfolder = 'download';
      const folder_location = './uploads/' + this.dept_foldername + '/' + this.seletedfolder + '/';

      if (this.file.type == "application/pdf") {
        if (this.file.size <= 3072000) {
          const formData = new FormData();
          formData.append('file', this.file);
          formData.append('folder_name', folder_location);
          this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
            this.filename = res;

            this.downloadForm.patchValue({
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

  /////////////////////////////////////////////////

  EditDept(id: any) {
    this.commonservice.paramFunction('alldeptdownload', id).subscribe(res => {
      this.deptdata = res[0];
      this.downloadForm.patchValue({
        id: this.deptdata.id,
        data: this.deptdata.data,
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
      this.commonservice.insert(form, 'main_download').subscribe(res => {
        if (res['affectedRows']) {
          Swal.fire({
            icon: 'success',
            text: '"Downloads" Data Entered',
            timer: 5000
          });
        }
      });
      this.getAllDownloads();
      this.router.navigate(['user/contactentryform']);
    }
    else {
      this.commonservice.updatedata(form, 'main_download').subscribe(res => {
        if (res['affectedRows']) {
          Swal.fire({
            icon: 'success',
            text: '"Downloads" Data Updated',
            timer: 5000
          });
        }
      })
      this.getAllDownloads();
    }
    this.router.navigate(['user/downloadentryform']);

  }

  ///////////////////////////////////////////////////

  slideChange(id: any, checked) {
    console.log(checked);
    let body = {
      id: id,
      isactive: ['N']
    }
    this.commonservice.updatedata(body, 'main_download').subscribe(res => {
      if (res['affectedRows']) {
        Swal.fire({
          icon: 'success',
          text: 'Data Disable',
          timer: 5000
        });
        this.getAllDownloads();
      }
    });
  }

  ////////////////////////////////////////////

  onChange(event: any) {
    if (event.value == 'L') { this.showwebsite = true; this.showpdf = false; }
    if (event.value == 'P') { this.showwebsite = false; this.showpdf = true; }

  }

  //////////////////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /////////////////////////////////////////////////////////////////

  getAllDownloads() {
    let index = 0;
    this.commonservice.paramFunction('deptdownload', this.dept_id).subscribe(res => {
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


  ///////////////////////////////////////////////////

}
