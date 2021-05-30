import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccomodationComponent } from './app/accomodation/accomodation.component';
import { AdminComponent } from './app/admin/admin.component';
import { SigninComponent } from './app/auth/signin/signin.component';
import { SignupComponent } from './app/auth/signup/signup.component';
import { HomeComponent } from './app/home/home.component';
import { OffersComponent } from './app/offers/offers.component';
//show the router in site www.localhost:4300/home and relate to app.module.ts
const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'accomodation',component:AccomodationComponent},
  {path:'offer',component:OffersComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin',component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
