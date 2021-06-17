import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public dept_id: any;
  public gallery: any = [];

  constructor(private http: HttpClient, private dp: DatePipe, private commonservice: CommonService) { }

  ngOnInit(): void {
    this.dept_id = 34;
    this.getDeptgallery(this.dept_id);
    console.log(".....................");
  }

  getDeptgallery(dept_id: any) {
    this.commonservice.paramFunction('gallery', this.dept_id).subscribe(res => {
      this.gallery = res;
      console.log(this.gallery);
    });
  }

}

