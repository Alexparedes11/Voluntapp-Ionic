import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageModule } from './components/menu/tabs.module'; // Import the TabsPageModule from the correct file path

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/menu/tabs.module').then(m => m.TabsPageModule) // Use the imported TabsPageModule
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
