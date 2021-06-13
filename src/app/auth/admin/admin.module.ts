import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TotalapplicationComponent } from './totalapplication/totalapplication.component';
import { CreatedeptComponent } from './createdept/createdept.component';


@NgModule({
  declarations: [DashboardComponent, TotalapplicationComponent, CreatedeptComponent,],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
