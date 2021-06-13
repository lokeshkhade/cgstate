import { DeptRoutingModule } from './dept-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DeptRoutingModule,
    MaterialModule
  ]
})
export class DeptModule { }
