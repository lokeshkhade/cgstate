import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss']
})
export class SchemeComponent implements OnInit {

  public temp: any = [];
  public data: any = [];

  rootUrl = environment.rootUrl;

  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService) { }

  ngOnInit(): void {

    this.getScheme();
  }

  getScheme() {
    this.commonservice.getFunction('scheme').subscribe(res => {
      this.data = res;
      this.temp = res;
      console.log(this.data);
    }
    );
  }

  search(keyword: string) {
    var val = keyword.toLowerCase().trim();
    const temp = this.temp.filter(function (d) {
      return d.scheme_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.data = temp;
  }



}
