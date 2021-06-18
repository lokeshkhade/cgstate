import { UploadComponent } from './upload/upload.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from 'src/app/material-module';
import { DeptconfigComponent } from './deptconfig/deptconfig.component';
import { SchemeformComponent } from './schemeform/schemeform.component';
import { DepartmententryformComponent } from './departmententryform/departmententryform.component';
import { ImplinkformComponent } from './implinkform/implinkform.component';
import { DeptpicComponent } from './deptpic/deptpic.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DeptcardComponent } from './deptcard/deptcard.component';

@NgModule({
  declarations: [UserDashboardComponent, UploadComponent, DeptconfigComponent, SchemeformComponent, DepartmententryformComponent, ImplinkformComponent, DeptpicComponent, DeptcardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ImageCropperModule
  ]
})
export class UserModule { }
