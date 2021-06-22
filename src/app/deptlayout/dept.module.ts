import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-module';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptfooterComponent } from './deptfooter/deptfooter.component';
import { DeptfullComponent } from './deptfull/deptfull.component';
import { DeptmenuComponent } from './deptmenu/deptmenu.component';
import { DepthomeComponent } from './depthome/depthome.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DeptaboutusComponent } from './deptaboutus/deptaboutus.component';
import { DeptcontactComponent } from './deptcontact/deptcontact.component';
import { DeptdownloadComponent } from './deptdownload/deptdownload.component';
import { DeptnoticeComponent } from './deptnotice/deptnotice.component';
import { DeptimpinfoComponent } from './deptimpinfo/deptimpinfo.component';
import { DeptnewComponent } from './deptnew/deptnew.component';


@NgModule({
  declarations: [DeptfooterComponent, DeptfullComponent, DeptmenuComponent, DepthomeComponent, DeptaboutusComponent, DeptcontactComponent, DeptdownloadComponent, DeptnoticeComponent, DeptimpinfoComponent, DeptnewComponent],
  imports: [
    CommonModule,
    DeptRoutingModule,
    MaterialModule,
    CarouselModule
  ]
})
export class DeptModule { }
