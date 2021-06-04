import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.loggedIn) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home']);
    // this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}