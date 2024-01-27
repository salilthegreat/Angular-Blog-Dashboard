import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  email!:string
  isLoggedIn$!:Observable<boolean>
  constructor(private authService:AuthService){
    this.isLoggedIn$ = this.authService.loginStatusCheck()
  }
  
  ngOnInit(): void {
    let data = localStorage.getItem('user')
    if(data){
      let authData =  JSON.parse(data)
      this.email =  authData?.email
    }
  }

  logOut(){
    this.authService.logOut()
  }
}
