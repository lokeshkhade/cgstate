import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from './../../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-deptnotice',
  templateUrl: './deptnotice.component.html',
  styleUrls: ['./deptnotice.component.scss']
})
export class DeptnoticeComponent implements OnInit {

  [x: string]: any;
  rootUrl = environment.rootUrl;
  displayedColumns: string[] = ['sn', 'linkname', 'menu_tab_linkurl', 'issuedate', 'validitydate'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: any = [];
  dept: any = [];
  menu: any = [];
  dept_id: any;
  menu_code: any;
  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {

    this.domain_name = window.location.href.split('/')[5];
    console.log(window.location.href.split('/')[5]);
    this.getDeptID();
  }




  getDeptID() {
    this.commonservice.paramFunction('deptidbydomainname', this.domain_name).subscribe(res => {
      this.dept_id = res[0].dept_id;
      console.log(this.dept_id);
      this.getNoticeboard();
    });
  }

  getNoticeboard() {
    let index = 0;
    this.commonservice.getFunction('deptlinks/' + this.dept_id).subscribe(res => {
      this.data = res;

      this.data.forEach(e => {
        this.data[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

