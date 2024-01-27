import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: "", component: LoginComponent ,canActivate:[loginGuard]},
    { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
    {path:"subscribers",loadComponent:()=>import('./subscribers/subscribers.component').then((c)=>c.SubscribersComponent),canActivate: [authGuard]},
    { path: "categories", loadComponent: () => import("./categories/categories.component").then(c => c.CategoriesComponent), canActivate: [authGuard] },
    { path: "posts", loadComponent: () => import("./posts/all-post/all-post.component").then(c => c.AllPostComponent), canActivate: [authGuard]},
    { path: "posts/new", loadComponent: () => import("./posts/new-post/new-post.component").then(c => c.NewPostComponent), canActivate: [authGuard] }

];
