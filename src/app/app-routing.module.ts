import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Como los states
/*const appRoutes: Routes = [
  { path: '', redirectTo: 'sigin', pathMatch: 'full' },
  { path: 'dashboard', loadChildren:()=> import('./dashboard/dashboard.module').then(mod=> mod.DashboardModule)},
  { path: '**', redirectTo: 'sigin', pathMatch: 'full' }
];*/

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
