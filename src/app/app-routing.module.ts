import { FeedbackComponent } from './feedback/feedback.component';
import { ReportsComponent } from './reports/reports.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SchemedetailsComponent } from './schemedetails/schemedetails.component';
import { ImpinfoComponent } from './impinfo/impinfo.component';
import { SchemeComponent } from './scheme/scheme.component';
import { DepartmentsComponent } from './departments/departments.component';
import { NewsComponent } from './news/news.component';
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
import { DepartmentlistComponent } from './departmentlist/departmentlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  { path: 'dept', loadChildren: () => import('./deptlayout/dept.module').then(m => m.DeptModule) },
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
        component: AboutusComponent,
        data: {
          title: 'About Chhattisgarh',
          urls: [
            { title: 'Home', url: '/home' },
          ]
        }

      },
      {
        path: 'reach',
        component: ReachComponent,
        data: {
          title: 'How to Reach',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'education',
        component: EducationComponent,
        data: {
          title: 'Education',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'districts',
        component: DistrictsComponent,
        data: {
          title: 'Districts',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'noticeboard',
        component: NoticeboardComponent,
        data: {
          title: 'Noticeboard',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'schemedetails',
        component: SchemedetailsComponent,
        data: {
          title: 'Scheme Details',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'impinfo',
        component: ImpinfoComponent,
        data: {
          title: 'Important Information',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'directory',
        component: DirectoryComponent,
        data: {
          title: 'Directory',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
          title: 'Departments All',
          urls: [
            { title: 'Home', url: '/home' },
            { title: 'Departments', url: '/departmentlist' },
          ]
        }
      },
      {
        path: 'departmentlist',
        component: DepartmentlistComponent,
        data: {
          title: 'Departments',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'census',
        component: CensusComponent,
        data: {
          title: 'Census',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'scheme',
        component: SchemeComponent,
        data: {
          title: 'Scheme',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Reports',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        data: {
          title: 'Feedback',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        data: {
          title: 'Gallery',
          urls: [
            { title: 'Home', url: '/home' }
          ]
        }
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
