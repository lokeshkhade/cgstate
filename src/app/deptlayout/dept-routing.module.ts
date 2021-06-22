import { DeptnoticeComponent } from './deptnotice/deptnotice.component';
import { DeptcontactComponent } from './deptcontact/deptcontact.component';
import { DeptdownloadComponent } from './deptdownload/deptdownload.component';
import { DeptaboutusComponent } from './deptaboutus/deptaboutus.component';
import { DepthomeComponent } from './depthome/depthome.component';
import { DeptfullComponent } from './deptfull/deptfull.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: ':domain_name',
    redirectTo: '/dept/:domain_name',
    pathMatch: 'full'
  },
  {
    path: ':domain_name',
    component: DeptfullComponent,
    children: [
      {
        path: '',
        component: DepthomeComponent
      },
      {
        path: 'deptaboutus',
        component: DeptaboutusComponent
      },
      {
        path: 'deptdownload',
        component: DeptdownloadComponent
      },
      {
        path: 'deptcontact',
        component: DeptcontactComponent
      },
      {
        path: 'deptnotice',
        component: DeptnoticeComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptRoutingModule { }
