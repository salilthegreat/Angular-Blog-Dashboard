import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  displayCategory!: Observable<any>
  inputData!:string
  categryType:string = 'Add';
  categoryId!:string
  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.displayCategory = this.categoriesService.displayData()
  }

  onSubmit(f: NgForm) {
    let categoryData: Category = f.value
    if(this.categryType == 'Add'){
      this.categoriesService.saveData(categoryData)
      f.reset()
    }else if(this.categryType == 'Edit'){ 
      this.categoriesService.updateData(this.categoryId,this.inputData)
      f.reset()
      this.categryType = 'Add'
    }
  }

  editData(id: string,category:string) {
    this.inputData = category
    this.categoryId = id
    this.categryType = 'Edit'
  }

  deleteData(id: string) {
    this.categoriesService.deleteData(id)
  }

}
