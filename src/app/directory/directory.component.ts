import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  [x: string]: any;
  rootUrl = environment.rootUrl;
  displayedColumns: string[] = ['sn', 'name', 'designation_name_hindi', 'cont_office_no', 'office_address'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  data: any = [];
  designation: any = [];
  menu: any = [];
  designation_id: any;
  menu_code: any;
  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {

    this.getDesignation();

    let index = 0;
    this.commonservice.getFunction('directory/0').subscribe(res => {
      this.data = res;
      console.log(this.data);
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

  desigChange(designation_id: any) {
    this.designation_id = designation_id;
  }



  onClick() {
    let index = 0;
    this.commonservice.getFunction('directory/' + this.designation_id).subscribe(res => {
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

  getDesignation() {
    this.commonservice.getFunction('designation').subscribe(res => {
      this.designation = res;
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
