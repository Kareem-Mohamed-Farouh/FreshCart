import { Routes } from '@angular/router';
import { AuthLayaoutComponent } from './Layouts/auth-layaout/auth-layaout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authguardGuard } from './core/guards/authguard/authguard.guard';
import { logedinGuard } from './core/guards/logedin/logedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayaoutComponent,
    canActivate: [logedinGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Home',
        canActivate: [authguardGuard],
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands',
        canActivate: [authguardGuard],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
        canActivate: [authguardGuard],
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
        canActivate: [authguardGuard],
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products',
        canActivate: [authguardGuard],
      },
      { path: '**', component: NotfoundComponent, title: '404 Not Found' },
    ],
  },
];

// import { BrandsComponent } from './pages/brands/brands.component';
// import { Routes } from '@angular/router';
// import { AuthLayaoutComponent } from './Layouts/auth-layaout/auth-layaout.component';
// import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   {
//     path: '',
//     component: AuthLayaoutComponent,

//     children: [
//       { path: 'login', component: LoginComponent, title: 'Login' },
//       { path: 'register', component: RegisterComponent, title: 'Register' },
//     ],
//   },

//   {
//     path: '',
//     component: BlankLayoutComponent,
//     children: [
//       {
//         path: 'home',
//         loadComponent: () =>
//           import('./pages/home/home.component').then((c) => c.HomeComponent),
//         title: 'Home',
//       },
//       { path: 'brands', component: BrandsComponent, title: 'Brands' },
//       { path: 'cart', component: CartComponent, title: 'Brands' },
//       {
//         path: 'categories',
//         component: CategoriesComponent,
//         title: 'Categories',
//       },
//       { path: 'products', component: ProductsComponent, title: 'Products' },
//       { path: '**', component: NotfoundComponent, title: '404 Not Found' },
//     ],
//   },
// ];
