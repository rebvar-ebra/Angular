import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{MaterialModuel} from './material.module';
import{FlexLayoutModule} from '@angular/flex-layout';
import { AccomodationComponent } from './app/accomodation/accomodation.component';
import { RoomsComponent } from './app/accomodation/rooms/rooms.component';
import { OffersComponent } from './app/offers/offers.component';
import { AuthComponent } from './app/auth/auth.component';
import { SigninComponent } from './app/auth/signin/signin.component';
import { SignupComponent } from './app/auth/signup/signup.component';
import { HomeComponent } from './app/home/home.component';
import { AdminComponent } from './app/admin/admin.component';
import { HeaderComponent } from './app/navigation/header/header.component';
import { SidenavListComponent } from './app/navigation/sidenav-list/sidenav-list.component';
import { NavtabsComponent } from './app/navigation/navtabs/navtabs.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './app/navigation/footer/footer.component';
import { ProfileComponent } from './app/dashbord/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    AccomodationComponent,
    RoomsComponent,
    
    OffersComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AdminComponent,
    HeaderComponent,
    SidenavListComponent,
    NavtabsComponent,
    FooterComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModuel,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
