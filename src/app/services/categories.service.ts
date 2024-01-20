import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  saveData(data: Object) {

    const categoryCollection = collection(this.firestore, 'Categories')
    addDoc(categoryCollection, data).then(() => this.toastr.success("Category Created")).catch((err) => console.log(err)
    )

  }

  displayData() {
    const categoryCollection = collection(this.firestore, 'Categories')
    return collectionData(categoryCollection, { idField: 'id' })
  }

  updateData(id: string, data: string) {
    const docInstance = doc(this.firestore, 'Categories', id)
    updateDoc(docInstance, { category: data }).then(() => this.toastr.success("Category Updated", "Data Update!")).catch((err) => console.log(err))
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'Categories', id)
    deleteDoc(docInstance).then(() => this.toastr.warning("Category Deleted")).catch((err) => console.log(err))
  }

}
