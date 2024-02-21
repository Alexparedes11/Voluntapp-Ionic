import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    loadChildren: () => import('./components/menu/tabs-routing.module').then( m => m.TabsPageRoutingModule)
  },

  
];
