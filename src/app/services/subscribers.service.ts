import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc ,deleteDoc} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private fireStor:Firestore, private toastr:ToastrService) { }

  loadData(){
    const collectionRef = collection(this.fireStor,'Subscribers');
    return collectionData(collectionRef,{idField:'id'})
  }

  deleteData(id:string){
    const docRef = doc(this.fireStor,'Subscribers',id)
    deleteDoc(docRef).then(()=>this.toastr.warning("Subscriber deleted successfully"))
  }
}
