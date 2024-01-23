import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit {

  postArray!: Array<any>

  constructor(private postService: PostsService) {

  }

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      this.postArray = val
    })
  }

  onDelete(postImgPath:string,id:string){
    this.postService.deleteImage(postImgPath,id)
  }

  onFeatured(id:string,action:boolean){
    this.postService.updateDoc(id,action)
  }

}
