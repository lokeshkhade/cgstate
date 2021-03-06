import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { EducationComponent } from './education/education.component';
import { FooterComponent } from './layout/footer/footer.component';

import { ErrorInterceptor } from './interceptors/http.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Spinner } from './interceptors/spinner.interceptor';
import { FullComponent } from './layout/full/full.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MaterialModule } from './material-module';
import { SpinnerService } from './services/spinner.service';
import { SpinnerComponent } from './spinner.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DirectoryComponent } from './directory/directory.component';
import { ReachComponent } from './reach/reach.component';
import { DistrictsComponent } from './districts/districts.component';
import { CensusComponent } from './census/census.component';
import { NewsComponent } from './news/news.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SchemeComponent } from './scheme/scheme.component';
import { ImpinfoComponent } from './impinfo/impinfo.component';
import { DepartmentlistComponent } from './departmentlist/departmentlist.component';
import { SchemedetailsComponent } from './schemedetails/schemedetails.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GalleryComponent } from './gallery/gallery.component';
import { ReportsComponent } from './reports/reports.component';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    HomeComponent,
    FullComponent,
    MenuComponent,
    AboutusComponent,
    RegistrationComponent,
    AuthComponent,
    ProfileComponent,
    NoticeboardComponent,
    DirectoryComponent,
    FooterComponent,
    ReachComponent,
    DistrictsComponent,
    DepartmentsComponent,
    CensusComponent,
    EducationComponent,
    NewsComponent,
    BreadcrumbComponent,
    SchemeComponent,
    ImpinfoComponent,
    DepartmentlistComponent,
    SchemedetailsComponent,
    GalleryComponent,
    ReportsComponent,
    FeedbackComponent,

  ],
  imports: [
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ImageCropperModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
        // whitelistedDomains: ['localhost:3000'],
        // blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),
  ],
  providers: [
    DatePipe,
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Spinner,
      multi: true
    }, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }, ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
