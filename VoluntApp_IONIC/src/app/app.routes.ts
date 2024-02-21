import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    loadChildren: () => import('./components/menu/tabs-routing.module').then( m => m.TabsPageRoutingModule)
  },  {
    path: 'news-details',
    loadComponent: () => import('./components/news-details/news-details.page').then( m => m.NewsDetailsPage)
  },
  {
    path: 'news-card',
    loadComponent: () => import('./components/news-card/news-card.page').then( m => m.NewsCardPage)
  },

  
];
