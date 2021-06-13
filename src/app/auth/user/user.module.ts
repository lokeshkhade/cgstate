import { UploadComponent } from './upload/upload.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from 'src/app/material-module';
import { DeptconfigComponent } from './deptconfig/deptconfig.component';

@NgModule({
  declarations: [UserDashboardComponent, UploadComponent, DeptconfigComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
