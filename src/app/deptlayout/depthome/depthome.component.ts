import { CommonService } from './../../services/common.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-depthome',
  templateUrl: './depthome.component.html',
  styleUrls: ['./depthome.component.scss']
})
export class DepthomeComponent implements OnInit {
  news: any = [];
  data: any = [];
  deptdata: any = [];
  impldata: any = [];
  currentdate: any;
  yesterday: any;
  public domain_name: any;
  public dept_id: any;
  rootUrl = environment.rootUrl;
  public carousel: any = [
    {
      img: 'assets/images/carousel/01.jpg',
      alt: '',
      heading: 'State Capital Raipur'
    }, {
      img: 'assets/images/carousel/02.jpg',
      alt: '',
      heading: 'The Tribes of Chhattisgarh'
    }, {
      img: 'assets/images/carousel/03.jpg',
      alt: '',
      heading: 'Craft of Chhattisgarh'
    }, {
      img: 'assets/images/carousel/04.jpg',
      alt: '',
      heading: 'Places of Chhattisgarh'
    },
  ]
  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.domain_name = this.route.snapshot.paramMap.get('domain_name');
    console.log(this.domain_name);
    this.getDeptID();


    this.currentdate = this.dp.transform(new Date().toISOString(), 'dd/MM/yyyy');
    this.yesterday = this.dp.transform((d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString(), 'dd/MM/yyyy');

    this.getNews(this.currentdate);

    this.commonservice.getFunction('noticeboard').subscribe(res => {
      this.data = res;
    });

    this.commonservice.getFunction('impinformation').subscribe(res => {
      this.impldata = res;
    });

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



  getNews(date: any) {
    this.http.get('http://dprcg.gov.in/api/aajKeSamachar?date=' + date).subscribe((res: any) => {
      this.news = res;
      if (this.news.length == 0) {
        this.getNews(this.yesterday);
      }
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
