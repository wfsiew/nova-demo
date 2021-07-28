import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: 'main',
    component: IndexComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  { path: '**', redirectTo: '/main/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
