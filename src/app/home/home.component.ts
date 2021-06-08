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
  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService) { }

  ngOnInit(): void {
    this.http.get('http://dprcg.gov.in/api/aajKeSamachar?date=' + this.dp.transform(new Date().toISOString(), 'dd/MM/yyyy')).subscribe((res: any) => {
      this.news = res;
      console.log(this.news);
    });

    this.commonservice.getFunction('noticeboard').subscribe(res => {
      this.data = res;
    });

    this.commonservice.getFunction('impinformation').subscribe(res => {
      this.impldata = res;
      console.log("KAVITA");
      console.log(this.impldata);
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
