import { Injectable } from '@angular/core';

import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Post } from '../models/post';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc,deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postArray!: Array<object>

  constructor(private storage: Storage, private firestore: Firestore, private toastr: ToastrService, private router: Router) {

  }

  uploadImage(img: File, postData: Post, formStatus:string, id:string) {
    const storageRef = ref(this.storage, Date.now() + img.name)
    uploadBytes(storageRef, img)
      .then(
        (uploadTask) => getDownloadURL(uploadTask.ref)
          .then((url) => {
            postData.postImgPath = url;
            if(formStatus == 'Add new'){
              this.saveData(postData)
            }else if(formStatus = "Edit"){
              this.updateData(id,postData)
            }
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err))
  }

  saveData(postData: Post) {
    const collectionRef = collection(this.firestore, 'Posts')
    addDoc(collectionRef, postData)
      .then(() => {
        this.toastr.success("Data Saved Successfully")
        this.router.navigate(['/posts'])
      })
      .catch((err) => {
        this.toastr.error("An error occured")
      })
  }

  loadData() {
    const collectionRef = collection(this.firestore, 'Posts')
    return collectionData(collectionRef, { idField: 'id' })
  }

  loadOneData(id: string) {
    const docRef = doc(this.firestore, 'Posts', id)
    return getDoc(docRef)
  }

  updateData(id:string,postData:Post){
    const docRef = doc(this.firestore,'Posts',id)
    updateDoc(docRef,{...postData}).then(()=>{
      this.toastr.success('Data updated successfully')
      this.router.navigate(["/posts"])
    })
    
  }

  deleteImage(postImgPath:string,id:string){
    let docRef = ref(this.storage,postImgPath)
    deleteObject(docRef).then(()=>{
      this.deleteData(id) 
    })
  }

  deleteData(id:string){
    const docInstance = doc(this.firestore,'Posts',id)
    deleteDoc(docInstance).then(()=>{
      this.toastr.warning("Post deleted successfully..!")
    })
  }

  updateDoc(id:string,type:boolean){
    const docInstance = doc(this.firestore,'Posts',id)
    updateDoc(docInstance,{isFeatured:type}).then(()=>{
      this.toastr.info("Featured Changes Happened .. !")
    })
  }

}
