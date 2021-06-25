import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from './../../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deptaboutus',
  templateUrl: './deptaboutus.component.html',
  styleUrls: ['./deptaboutus.component.scss']
})
export class DeptaboutusComponent implements OnInit {

  public domain_name: any;
  [x: string]: any;
  rootUrl = environment.rootUrl;
  //displayedColumns: string[] = ['sn', 'linkname', 'linkurl', 'issuedate', 'validitydate'];
  displayedColumns: string[] = ['sn', 'linkname', 'linkurl'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dept_id: any;
  public data: any = [];

  constructor(private commonservice: CommonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.domain_name = window.location.href.split('/')[5];
    console.log(window.location.href.split('/')[5]);

    this.getDeptID();

    console.log(this.dept_id);
  }

  getDeptID() {
    this.commonservice.paramFunction('deptidbydomainname', this.domain_name).subscribe(res => {
      this.dept_id = res[0].dept_id;
      console.log(this.dept_id);
      this.getaboutus(this.dept_id);

    });
  }

  getaboutus(dept_id: any) {
    let index = 0;
    this.commonservice.paramFunction('deptaboutus', this.dept_id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.data.forEach(e => {
        this.data[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


}
