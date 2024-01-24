import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {  
  const authService = inject(AuthService)
  const router = inject(Router)
  const toastr = inject(ToastrService)

  if(authService.isLoggedInGuard){
    return true
  }else{
    toastr.warning("Access Denied..!")
    router.navigate(['/login'])
    return false
  }
};
