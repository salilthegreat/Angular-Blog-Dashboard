import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {  
  const authService = inject(AuthService)
  const router = inject(Router)
  const toastr = inject(ToastrService)

return authService.loginStatusCheck().pipe(take(1),switchMap((isLoggedIn)=>{
  if(isLoggedIn){
    return [true]
  }else{
    toastr.warning('Access Denied')
    router.navigate(['/'])
    return [false]
  }
}))
};
