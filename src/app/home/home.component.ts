import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  news: any = [];
  data: any = [];
  impldata: any = [];
  currentdate: any;
  yesterday: any;
  public dept_id: any;
  deptdata: any = [];
  rootUrl = environment.rootUrl;
  public gallery: any = [];
  public carousel: any = [
    // {
    //   img: 'assets/images/carousel/01.jpg',
    //   alt: '',
    //   heading: 'State Capital Raipur'
    // }, {
    //   img: 'assets/images/carousel/02.jpg',
    //   alt: '',
    //   heading: 'The Tribes of Chhattisgarh'
    // }, {
    //   img: 'assets/images/carousel/03.jpg',
    //   alt: '',
    //   heading: 'Craft of Chhattisgarh'
    // }, {
    //   img: 'assets/images/carousel/04.jpg',
    //   alt: '',
    //   heading: 'Places of Chhattisgarh'
    // },
  ]

  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService) { }

  ngOnInit(): void {
    this.dept_id = 34;
    this.getDeptData(this.dept_id);
    this.getDeptbanner(this.dept_id);
    this.getDeptgallery(this.dept_id);
    this.currentdate = this.dp.transform(new Date().toISOString(), 'dd/MM/yyyy');
    this.yesterday = this.dp.transform((d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString(), 'dd/MM/yyyy');

    this.getNews(this.currentdate);

    this.commonservice.getFunction('noticeboard').subscribe(res => {
      this.data = res;
    });

    this.commonservice.paramFunction('impinformation', this.dept_id).subscribe(res => {
      this.impldata = res;
      console.log(this.impldata);
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
