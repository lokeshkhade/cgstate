import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deptaboutus',
  templateUrl: './deptaboutus.component.html',
  styleUrls: ['./deptaboutus.component.scss']
})
export class DeptaboutusComponent implements OnInit {
  public domain_name: any;
  constructor() { }

  ngOnInit(): void {
    this.domain_name = window.location.href.split('/')[5];
  }

}
