import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationStart, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  roleId: any;
  constructor(
    private router:Router,
    private authenticationService:AuthenticationService
    
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | any {
      const currentUser:any = this.authenticationService.getUser();
      if (currentUser) {
        // console.log('chcking,auth', this.isAuthorised(this.roleId));
        // check if route is restricted by role
        if (route.data['role'] && route.data['role'].indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
        }
        
        // this.router.events.subscribe((data: any) => {
        //     if (data instanceof ActivationStart) {
        //         if (!!data.snapshot.data['role']) {
        //             this.roleId = data.snapshot.data['role'];
        //             if (!!this.roleId && Number(this.roleId) !== Number(currentUser.roleId)) {
        //                 this.router.navigate(['/']);
        //                 return false;
        //             }
        //         }
        //     }
    
        // });
      
    return true;
  }
  this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  return false
  
}


}