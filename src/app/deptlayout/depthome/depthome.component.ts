import { CommonService } from './../../services/common.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-depthome',
  templateUrl: './depthome.component.html',
  styleUrls: ['./depthome.component.scss']
})
export class DepthomeComponent implements OnInit {

  public domain_name: any;
  news: any = [];
  noticeboarddata: any = [];
  impldata: any = [];
  currentdate: any;
  yesterday: any;
  public dept_id: any;
  deptdata: any = [];
  rootUrl = environment.rootUrl;
  public gallery: any = [];
  public carousel: any = [];

  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.domain_name = this.route.snapshot.paramMap.get('domain_name');
    console.log(this.domain_name);
    this.getDeptID();

  }

  getDeptID() {

    this.commonservice.paramFunction('deptidbydomainname', this.domain_name).subscribe(res => {
      this.dept_id = res[0].dept_id;

      /////////////////////////////////////////////////

      this.getDeptData(this.dept_id);

      this.getNoticeboard(this.dept_id);

      this.getImpInfo(this.dept_id);

      this.getDeptbanner(this.dept_id);
      this.getDeptgallery(this.dept_id);


    });
  }

  getNoticeboard(dept_id: any) {
    this.commonservice.paramFunction('deptnoticeboard', this.dept_id).subscribe(res => {
      this.noticeboarddata = res;
    });
  }

  getImpInfo(dept_id: any) {
    this.commonservice.paramFunction('impinformation', this.dept_id).subscribe(res => {
      this.impldata = res;
    });
  }

  getDeptData(dept_id: any) {
    this.commonservice.paramFunction('dept', this.dept_id).subscribe(res => {
      this.deptdata = res[0];
    });
  }


  getDeptbanner(dept_id: any) {
    this.commonservice.paramFunction('banner', this.dept_id).subscribe(res => {
      this.carousel = res;
    });
  }

  getDeptgallery(dept_id: any) {
    this.commonservice.paramFunction('gallery', this.dept_id).subscribe(res => {
      this.gallery = res;
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 4,
    margin: 10,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      }
    },
    nav: true
  }




}
