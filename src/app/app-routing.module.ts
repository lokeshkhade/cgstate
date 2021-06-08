import { EducationComponent } from './education/education.component';
import { CensusComponent } from './census/census.component';
import { DistrictsComponent } from './districts/districts.component';
import { ReachComponent } from './reach/reach.component';
import { DirectoryComponent } from './directory/directory.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FullComponent } from './layout/full/full.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'reach',
        component: ReachComponent
      },
      {
        path: 'education',
        component: EducationComponent
      },
      {
        path: 'districts',
        component: DistrictsComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'noticeboard',
        component: NoticeboardComponent
      },
      {
        path: 'directory',
        component: DirectoryComponent
      },
      {
        path: 'census',
        component: CensusComponent
      },
      {
        path: 'education',
        component: EducationComponent
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'admin', loadChildren: () => import('./auth/admin/admin.module').then(m => m.AdminModule) },
      { path: 'profile', component: ProfileComponent },
      { path: 'user', loadChildren: () => import('./auth/user/user.module').then(m => m.UserModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
