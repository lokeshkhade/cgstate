import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-module';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptfooterComponent } from './deptfooter/deptfooter.component';
import { DeptfullComponent } from './deptfull/deptfull.component';
import { DeptmenuComponent } from './deptmenu/deptmenu.component';
import { DepthomeComponent } from './depthome/depthome.component';

@NgModule({
  declarations: [DeptfooterComponent, DeptfullComponent, DeptmenuComponent, DepthomeComponent],
  imports: [
    CommonModule,
    DeptRoutingModule,
    MaterialModule,
  ]
})
export class DeptModule { }
