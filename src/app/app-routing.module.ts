import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/no-auth.guard";

const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'store-home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard]
  },  
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'user-sale-detail/:idDate',
    loadChildren: () => import('./pages/user-sale-detail/user-sale-detail.module').then( m => m.UserSaleDetailPageModule)
  },
  {
    path: 'user-edit-profile/:uid',
    loadChildren: () => import('./pages/user-edit-profile/user-edit-profile.module').then( m => m.UserEditProfilePageModule), canActivate: [NoAuthGuard]
  },
  
  {
    path: 'client-data-modal',
    loadChildren: () => import('./pages/client-data-modal/client-data-modal.module').then( m => m.ClientDataModalPageModule), canActivate: [NoAuthGuard]
  }, 
  {
    path: 'delivery-panel',
    loadChildren: () => import('./pages/delivery-panel/delivery-panel.module').then( m => m.DeliveryPanelPageModule), canActivate: [NoAuthGuard]
 
  }, 
  {
    path: 'complete-user-data',
    loadChildren: () => import('./pages/complete-user-data/complete-user-data.module').then( m => m.CompleteUserDataPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'store-home',
    loadChildren: () => import('./pages/store-home/store-home.module').then( m => m.StoreHomePageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'store-cart-modal',
    loadChildren: () => import('./pages/store-cart-modal/store-cart-modal.module').then( m => m.StoreCartModalPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-add-product',
    loadChildren: () => import('./pages/admin-add-product/admin-add-product.module').then( m => m.AdminAddProductPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./pages/admin-panel/admin-panel.module').then( m => m.AdminPanelPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-add-category',
    loadChildren: () => import('./pages/admin-add-category/admin-add-category.module').then( m => m.AdminAddCategoryPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'store-products/:category',
    loadChildren: () => import('./pages/store-products/store-products.module').then( m => m.StoreProductsPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'store-categorys',
    loadChildren: () => import('./pages/store-categorys/store-categorys.module').then( m => m.StoreCategorysPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-category-list',
    loadChildren: () => import('./pages/admin-category-list/admin-category-list.module').then( m => m.AdminCategoryListPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-product-list/:category',
    loadChildren: () => import('./pages/admin-product-list/admin-product-list.module').then( m => m.AdminProductListPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-category-edit/:id',
    loadChildren: () => import('./pages/admin-category-edit/admin-category-edit.module').then( m => m.AdminCategoryEditPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-product-edit/:id',
    loadChildren: () => import('./pages/admin-product-edit/admin-product-edit.module').then( m => m.AdminProductEditPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-user-list',
    loadChildren: () => import('./pages/admin-user-list/admin-user-list.module').then( m => m.AdminUserListPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-user-edit/:id',
    loadChildren: () => import('./pages/admin-user-edit/admin-user-edit.module').then( m => m.AdminUserEditPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-user-profile/:id',
    loadChildren: () => import('./pages/admin-user-profile/admin-user-profile.module').then( m => m.AdminUserProfilePageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-sales',
    loadChildren: () => import('./pages/admin-sales/admin-sales.module').then( m => m.AdminSalesPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-delivery-list',
    loadChildren: () => import('./pages/admin-delivery-list/admin-delivery-list.module').then( m => m.AdminDeliveryListPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-news-list',
    loadChildren: () => import('./pages/admin-news-list/admin-news-list.module').then( m => m.AdminNewsListPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-news-edit/:id',
    loadChildren: () => import('./pages/admin-news-edit/admin-news-edit.module').then( m => m.AdminNewsEditPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'admin-news-add',
    loadChildren: () => import('./pages/admin-news-add/admin-news-add.module').then( m => m.AdminNewsAddPageModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'store-products-all',
    loadChildren: () => import('./pages/store-products-all/store-products-all.module').then( m => m.StoreProductsAllPageModule), canActivate: [NoAuthGuard]
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
