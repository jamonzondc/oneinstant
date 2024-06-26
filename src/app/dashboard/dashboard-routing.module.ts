import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) },
      { path: 'followers', loadChildren: () => import('./followers/followers.module').then(mod => mod.FollowersModule) },
      {path:'test', component: TestComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
