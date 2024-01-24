import { Injectable } from '@angular/core';

import { Auth,signInWithEmailAndPassword, authState, signOut} from '@angular/fire/auth';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoggedInGuard:boolean = false

  constructor(private auth:Auth, private toastr:ToastrService,private router:Router) { }

  login(email:string,password:string){
    signInWithEmailAndPassword(this.auth,email,password)
    .then(()=>{
      this.toastr.success('Logged in successfully')
      this.loadUser()
      this.isLoggedIn.next(true)
      this.isLoggedInGuard = true
      this.router.navigate(["/"])
    })
    .catch((err)=>{
      this.toastr.warning(err)
    })
  }

  loadUser(){
    authState(this.auth).subscribe((val)=>{
      // console.log(val?.email);
      localStorage.setItem("user",JSON.stringify(val))  
    })
  }

  logOut(){
    signOut(this.auth).then(()=>{
      this.toastr.success("Logged out successfully")
      localStorage.removeItem('user')
      this.isLoggedIn.next(false)
      this.isLoggedInGuard = false
      this.router.navigate(['/login'])
    })
  }

  loginStatusCheck(){
    return this.isLoggedIn.asObservable()
  }

}
