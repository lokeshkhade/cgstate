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
  constructor(private http: HttpClient, private dp: DatePipe) { }

  ngOnInit(): void {

    this.http.get('http://dprcg.gov.in/api/aajKeSamachar?date=' + this.dp.transform(new Date().toISOString(), 'dd/MM/yyyy')).subscribe((res: any) => {
      this.news = res;
      console.log(this.news);
    });



  }

}
