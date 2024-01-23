import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';




@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularEditorModule, HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup
  postId!: string
  editingData!: any
  formStatus: string = "Add new"
  permalinkValue!: string;
  imgSrc: any = "./assets/placeholder.png"
  selectedImage!: any;
  categoryList!: Observable<any>

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {

    this.route?.queryParams.subscribe((val) => {
      this.postId = val['id']
      if(this.postId){
        this.postService.loadOneData(this.postId).then((doc) => {
          this.editingData = doc.data();
  
          this.postForm = this.fb.group({
            title: [this.editingData.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.editingData.permalink, Validators.required],
            excerpt: [this.editingData.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.editingData.category.categoryId}-${this.editingData.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.editingData.content, Validators.required]
          })
          this.formStatus = 'Edit'
          this.imgSrc = this.editingData.postImgPath

        })
      } else{
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: [this.permalinkValue, Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        })
        
      }
    })

  }
  get fc() {
    return this.postForm.controls
  }

  ngOnInit(): void {
    this.categoryList = this.categoriesService.displayData()
    // this.postForm?.get('permalink')?.disable()
  }



  titleChange($event: KeyboardEvent) {
    let inputValue = ($event.target as HTMLInputElement).value
    this.permalinkValue = inputValue.replace(/\s/g, "-")
    this.postForm.patchValue({ permalink: this.permalinkValue })
  }

  showPreview($event: Event) {
    const fileName = ($event.target as HTMLInputElement).files
    if (fileName && fileName.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(fileName[0])
      reader.addEventListener('load', (e) => {
        this.imgSrc = e.target?.result as string
        this.selectedImage = fileName[0]
      })
    }

  }


  onSubmit() {
    const splitted = this.postForm.value.category.split("-")
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date,
    }
      this.postService.uploadImage(this.selectedImage, postData,this.formStatus,this.postId)
      this.postForm.reset();
      this.imgSrc = './assets/placeholder.png'

  }

}
