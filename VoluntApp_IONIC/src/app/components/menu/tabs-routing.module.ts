import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { EventDetailsPage } from '../event-details/event-details.page';
import { NewsDetailsPage } from '../news-details/news-details.page';


export const routes: Routes = [
  {
    path: 'menu',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'notices',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notices/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'event-details/:id',
        component: EventDetailsPage,
      },
      {
        path: 'news-details/:id',
        component: NewsDetailsPage,
      },
      {
        path: '',
        redirectTo: '/menu/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
