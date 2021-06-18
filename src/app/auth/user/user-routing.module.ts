import { DeptcardComponent } from './deptcard/deptcard.component';
import { DeptpicComponent } from './deptpic/deptpic.component';
import { ImplinkformComponent } from './implinkform/implinkform.component';
import { SchemeformComponent } from './schemeform/schemeform.component';
import { DeptconfigComponent } from './deptconfig/deptconfig.component';
import { DepartmentsComponent } from './../../departments/departments.component';
import { UploadComponent } from './upload/upload.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmententryformComponent } from './departmententryform/departmententryform.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'deptconfig',
    component: DeptconfigComponent
  },
  {
    path: 'schemeform',
    component: SchemeformComponent
  },
  {
    path: 'departmententryform',
    component: DepartmententryformComponent
  },
  {
    path: 'implinkform',
    component: ImplinkformComponent
  },
  {
    path: 'deptpic',
    component: DeptpicComponent
  },
  {
    path: 'deptcard',
    component: DeptcardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
