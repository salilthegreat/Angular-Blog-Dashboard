import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:"",component:DashboardComponent},
    {path:"categories",loadComponent:()=>import("./categories/categories.component").then(c=>c.CategoriesComponent)}
];
