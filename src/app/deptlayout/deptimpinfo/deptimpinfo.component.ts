import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from './../../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-deptimpinfo',
  templateUrl: './deptimpinfo.component.html',
  styleUrls: ['./deptimpinfo.component.scss']
})

export class DeptimpinfoComponent implements OnInit {
  [x: string]: any;
  rootUrl = environment.rootUrl;
  displayedColumns: string[] = ['sn', 'linkname', 'linkurl', 'issuedate', 'validitydate'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dept_id: any;

  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {
    this.domain_name = this.route.snapshot.paramMap.get('domain_name');
    console.log(this.domain_name);
    this.getDeptID();
  }

  getDeptID() {

    console.log(".......................");

    this.commonservice.paramFunction('deptidbydomainname', this.domain_name).subscribe(res => {

      this.dept_id = res[0].dept_id;
      this.getimpinfo(this.dept_id);

      console.log(".......................");

      console.log(this.dept_id);
    });
  }

  getimpinfo(dept_id: any) {
    let index = 0;
    this.commonservice.paramFunction('allimpinformation', this.dept_id).subscribe(res => {
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
