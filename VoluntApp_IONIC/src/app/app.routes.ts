import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'header',
    loadComponent: () => import('./components/headers/headers.component').then( m => m.HeadersComponent)
  },
  {
    path: 'event-card',
    loadComponent: () => import('./components/event-card/event-card.page').then( m => m.EventCardPage)
  },
];