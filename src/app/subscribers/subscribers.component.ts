import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent implements OnInit {

  emailList!:Observable<any>
  constructor(private subscriberService:SubscribersService){

  }
ngOnInit(): void {
 this.emailList = this.subscriberService.loadData()
}
onDelete(id:string){
  this.subscriberService.deleteData(id)
}
}
