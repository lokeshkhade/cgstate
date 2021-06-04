import { UploadComponent } from './upload/upload.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
