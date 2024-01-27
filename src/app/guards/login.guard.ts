import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { switchMap, take } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const toastr = inject(ToastrService)
  const router = inject(Router)

  return auth.loginStatusCheck().pipe(take(1),switchMap((isLoggedIn)=>{
    if(!isLoggedIn){
      return[true]
    }else{
      toastr.warning("You are already logged in")
      router.navigate(['/dashboard'])
      return [false]
    }
  }))
};
