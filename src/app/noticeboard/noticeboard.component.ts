import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.scss']
})
export class NoticeboardComponent implements OnInit {
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
    this.getDept();
    this.getMenu();
    let index = 0;
    this.commonservice.getFunction('deptlinks/0').subscribe(res => {
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
  deptChange(dept_id: any) {
    this.dept_id = dept_id;
  }
  typeChange(menu_code: any) {
    this.menu_code = menu_code;
  }
  onClick() {
    if (this.dept_id != 0 && this.menu_code != 0) {
      let index = 0;
      this.commonservice.getFunction('deptlinksbytype/' + this.dept_id + '/' + this.menu_code).subscribe(res => {
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
    else {
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
      });
    }
  }

  getDept() {
    this.commonservice.getFunction('dept').subscribe(res => {
      this.dept = res;
    }
    );
  }

  getMenu() {
    this.commonservice.getFunction('uploadmenu').subscribe(res => {
      this.menu = res;
    }
    );
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
