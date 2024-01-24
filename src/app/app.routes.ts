import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: "", component: DashboardComponent, canActivate: [authGuard] },
    { path: "login", component: LoginComponent },
    { path: "categories", loadComponent: () => import("./categories/categories.component").then(c => c.CategoriesComponent), canActivate: [authGuard] },
    { path: "posts", loadComponent: () => import("./posts/all-post/all-post.component").then(c => c.AllPostComponent), canActivate: [authGuard] },
    { path: "posts/new", loadComponent: () => import("./posts/new-post/new-post.component").then(c => c.NewPostComponent), canActivate: [authGuard] }

];
