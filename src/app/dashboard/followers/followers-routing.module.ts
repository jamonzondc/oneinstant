import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowersComponent } from '../followers/followers.component';

const routes: Routes = [
  { path: '', component: FollowersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowersRoutingModule { }
