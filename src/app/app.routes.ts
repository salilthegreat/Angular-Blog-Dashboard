import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:"",component:DashboardComponent},
    {path:"categories",loadComponent:()=>import("./categories/categories.component").then(c=>c.CategoriesComponent)},
    {path:"posts",loadComponent:()=>import("./posts/all-post/all-post.component").then(c=>c.AllPostComponent)},
    {path:"posts/new",loadComponent:()=>import("./posts/new-post/new-post.component").then(c=>c.NewPostComponent)}

];
