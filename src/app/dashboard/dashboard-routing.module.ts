import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FollowersComponent } from './followers/followers.component';


const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
        { path: 'home', component: HomeComponent },
        { path: 'followers', component: FollowersComponent }

    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
