import { DeptRoutingModule } from './dept-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-module';
import { DeptfooterComponent } from './deptfooter/deptfooter.component';



@NgModule({
  declarations: [DeptfooterComponent],
  imports: [
    CommonModule,
    DeptRoutingModule,
    MaterialModule
  ]
})
export class DeptModule { }
