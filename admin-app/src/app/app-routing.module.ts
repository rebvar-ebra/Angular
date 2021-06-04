import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import{HotelComponent} from './admin/hotel/hotel.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  {
  path:'admin/users',component:UsersComponent
},{
  path:'admin/rooms',component:HotelComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
