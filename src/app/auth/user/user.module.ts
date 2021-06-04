import { UploadComponent } from './upload/upload.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from 'src/app/material-module';

@NgModule({
  declarations: [UserDashboardComponent, UploadComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
