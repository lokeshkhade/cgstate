import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-impinfo',
  templateUrl: './impinfo.component.html',
  styleUrls: ['./impinfo.component.scss']
})
export class ImpinfoComponent implements OnInit {

  [x: string]: any;
  rootUrl = environment.rootUrl;
  displayedColumns: string[] = ['sn', 'linkname', 'linkurl', 'issuedate', 'validitydate'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dept_id: any;


  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {

    this.dept_id = 34;
    this.getimpinfo();

  }

  getimpinfo() {

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
    }
    );

  }

}
