import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schemedetails',
  templateUrl: './schemedetails.component.html',
  styleUrls: ['./schemedetails.component.scss']
})

export class SchemedetailsComponent implements OnInit {

  public data: any = [];

  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService) { }

  ngOnInit(): void {

    this.getScheme();

  }

  getScheme() {
    this.commonservice.getFunction('scheme').subscribe(res => {
      this.data = res;
    });
  }

}
