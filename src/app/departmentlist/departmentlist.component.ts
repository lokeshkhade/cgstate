import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import Swal from 'sweetalert2';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.scss']
})
export class DepartmentlistComponent implements OnInit {

  public temp: any = [];
  public data: any = [];

  rootUrl = environment.rootUrl;

  // public dept = [
  //   {
  //     dept_name: "mohan"
  //   },
  //   {
  //     dept_name: "rakesh"
  //   }
  // ]

  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService) { }

  ngOnInit(): void {
    // this.data = this.dept;
    // this.temp = this.dept;
    this.getDept();
  }

  getDept() {
    this.commonservice.getFunction('deptlist').subscribe(res => {
      this.data = res;
      this.temp = res;
    });
  }

  search(keyword: string) {
    var val = keyword.toLowerCase().trim();
    const temp = this.temp.filter(function (d) {
      return d.deptname_en.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.data = temp;
  }

}
