import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any = [];
  currentdate: any;
  yesterday: any;
  constructor(private http: HttpClient, private dp: DatePipe) { }

  ngOnInit(): void {

    this.currentdate = this.dp.transform(new Date().toISOString(), 'dd/MM/yyyy');
    this.yesterday = this.dp.transform((d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString(), 'dd/MM/yyyy');

    this.getNews(this.currentdate);

  }

  getNews(date: any) {
    this.http.get('http://dprcg.gov.in/api/aajKeSamachar?date=' + date).subscribe((res: any) => {
      this.news = res;
      if (this.news.length == 0) {
        this.getNews(this.yesterday);
        //let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
        console.log("kavita k" + this.yesterday);
      }
      console.log(this.news);
    });
  }

}

