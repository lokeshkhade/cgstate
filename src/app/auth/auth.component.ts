import { AuthService } from './../services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MENUITEMS } from './menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  mobileQuery: MediaQueryList;
  public menuItems: any;
  private _mobileQueryListener: () => void;
  public currentUser: any;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public platform: Platform,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.menuItems = MENUITEMS[this.authService.currentUser.role];

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }
  logout() {
    this.authService.logout();
  }
}
