import { ForgetPassComponent } from './shared/components/forgetPass/forget-pass/forget-pass.component';
import { Routes } from '@angular/router';
import { AuthLayaoutComponent } from './Layouts/auth-layaout/auth-layaout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authguardGuard } from './core/guards/authguard/authguard.guard';
import { logedinGuard } from './core/guards/logedin/logedin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'homelogin', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayaoutComponent,
    canActivate: [logedinGuard],
    children: [
      {
        path: 'homelogin',
        loadComponent: () =>
          import('./pages/homelogin/homelogin/homelogin.component').then(
            (c) => c.HomeloginComponent
          ),
        title: 'homelogin',
      },
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
      {
        path: 'forget',
        loadComponent: () =>
          import(
            './shared/components/forgetPass/forget-pass/forget-pass.component'
          ).then((c) => c.ForgetPassComponent),
        title: 'Forget Password',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authguardGuard],

    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Home',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'checkout/:idCart',
        loadComponent: () =>
          import('./pages/checkout/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'checkout',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
      },

      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
        title: 'WishList',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products',
      },

      {
        path: 'details/:detailsId',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'CategoryDetails/:detailsCatId',
        loadComponent: () =>
          import(
            './pages/spicificCatDetails/spicific-cat-details/spicific-cat-details.component'
          ).then((c) => c.SpicificCatDetailsComponent),
        title: 'Category Details',
      },

      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/all-order/all-order.component').then(
            (c) => c.AllOrderComponent
          ),
        title: 'allOrders',
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
