import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../services/common.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deptfull',
  templateUrl: './deptfull.component.html',
  styleUrls: ['./deptfull.component.scss']
})


export class DeptfullComponent implements OnInit {

  public domain_name: any;

  news: any = [];
  data: any = [];
  deptdata: any = [];
  impldata: any = [];
  currentdate: any;
  yesterday: any;
  public dept_id: any;
  rootUrl = environment.rootUrl;


  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(window.location);

    this.domain_name = this.route.snapshot.paramMap.get('domain_name');
    console.log(this.domain_name);
    this.getDeptID();

  }

  getDeptID() {

    this.commonservice.paramFunction('deptidbydomainname', this.domain_name).subscribe(res => {
      this.dept_id = res[0].dept_id;
      this.getDeptData(this.dept_id);

    });
  }

  getDeptData(dept_id: any) {
    this.commonservice.paramFunction('dept', this.dept_id).subscribe(res => {
      this.deptdata = res[0];
    });
  }

}
