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
  selector: 'app-deptpic',
  templateUrl: './deptpic.component.html',
  styleUrls: ['./deptpic.component.scss']
})
export class DeptpicComponent implements OnInit {

  public bannerForm: FormGroup;
  public imagetype: any;

  file: any = File;
  filename: any;
  dept_id: any;
  user_id: any;
  public dept_foldername: any;
  public pictype: any;
  public deptdata: any = [];
  imageChangedEvent: any;
  croppedImage: any;
  public cropped = false;

  public data: any = [];

  displayedColumns: string[] = ['sn', 'imagetitle_en', 'imagetitle_hn', 'linkurl', 'EditData', 'action'];
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
    return this.bannerForm.controls[fieldName].invalid &&
      (this.bannerForm.controls[fieldName].dirty || this.bannerForm.controls[fieldName].touched);
  }


  ngOnInit(): void {

    this.bannerForm = this.fb.group({
      linkurl: ['', Validators.required],
      imagetitle_en: ['', Validators.required],
      imagetitle_hn: ['', Validators.required],
      dept_id: [],
      id: [],
      isactive: ['Y'],
      imagetype: []
    });

    let user = this.authservice.currentUser;
    this.user_id = user.user_id;
    this.dept_id = user.dept_id;
    this.dept_foldername = user.dept_foldername;

    this.getAllImages();
  }

  getimagetype(event: any) {
    this.imagetype = event.value;
  }

  upload_Picture(event: any) {
    if (event) {
      this.file = event[0];

      const folder_location = './uploads/' + this.dept_foldername + '/' + 'banner' + '/';

      if (this.file.size <= 3072000) {
        const formData = new FormData();
        formData.append('file', this.file);
        formData.append('folder_name', folder_location);
        this.http.post(environment.rootUrl + 'upload', formData).subscribe(res => {
          this.filename = res;

          this.bannerForm.patchValue({
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
          text: 'Picture size should be less than 300KB.'
        });
        this.file = null;
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Only jpeg/png file accepted.'
      });
      this.file = null;
    }
  }

  ///////////////////////////////////////////////////

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  /////////////////////////////////////////////////////////


  EditDept(id: any) {
    this.commonservice.paramFunction('idbanner', id).subscribe(res => {
      this.deptdata = res[0];
      console.log(this.deptdata);
      this.bannerForm.patchValue({
        id: this.deptdata.id,
        linkurl: this.deptdata.linkurl,
        // issuedate: this.deptdata.issuedate,
        // validitydate: this.deptdata.validitydate,
        dept_id: this.deptdata.dept_id,
        isactive: this.deptdata.isactive,
        imagetitle_en: this.deptdata.imagetitle_en,
        imagetitle_hn: this.deptdata.imagetitle_hn,
        imagetype: this.deptdata.imagetype,
      });
    });
  }

  ///////////////////////////////////////////////////

  save(form: NgForm) {
    console.log(form["id"]);
    if (form["id"] == null) {
      this.commonservice.insert(form, 'main_banner').subscribe(res => {
        if (res['affectedRows']) {
          Swal.fire({
            icon: 'success',
            text: '"Card" Data Entered',
            timer: 5000
          });
        }
      });
      this.getAllImages();
      this.router.navigate(['user/deptpic']);
    }
    else {
      this.commonservice.updatedata(form, 'main_banner').subscribe(res => {
        if (res['affectedRows']) {
          Swal.fire({
            icon: 'success',
            text: '"Card" Data Updated',
            timer: 5000
          });
        }
      })
      this.getAllImages();
    }
    this.router.navigate(['user/deptpic']);

  }

  ///////////////////////////////////////////////////

  slideChange(id: any, checked) {
    console.log(checked);
    let body = {
      id: id,
      isactive: ['N']
    }
    this.commonservice.updatedata(body, 'main_banner').subscribe(res => {
      if (res['affectedRows']) {
        Swal.fire({
          icon: 'success',
          text: 'Data Disable',
          timer: 5000
        });
        this.getAllImages();
      }
    });
  }

  /////////////////////////////////////////////////////////////////

  getAllImages() {
    let index = 0;
    this.commonservice.paramFunction('banner', this.dept_id).subscribe(res => {
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
