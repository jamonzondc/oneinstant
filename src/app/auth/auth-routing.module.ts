import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SiginComponent } from './sigin/sigin.component';
import { SigupComponent } from './sigup/sigup.component';




//Como los states
const authRoutes: Routes = [
   
    { path: 'sigin', component: SiginComponent, data: { animation: 'sigin' } },
    { path: 'sigup', component: SigupComponent, data: { animation: 'sigup' } }
   
];

@NgModule({
    declarations: [

    ],
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
