import { CreatedeptComponent } from './createdept/createdept.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TotalapplicationComponent } from './totalapplication/totalapplication.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'totalapplication', component: TotalapplicationComponent },
  { path: 'createdept', component: CreatedeptComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
