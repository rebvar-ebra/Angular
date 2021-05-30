import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import{User} from './app/model/user.model';
import {Person} from './app/model/person.model';
import { LoginUser } from './app/model/login.model';
import { Room } from './app/model/Room.model';
import { IncRoom } from './app/model/inc-room.model';
import { Book } from './app/model/book.model';
import { IDsToHotel } from './app/model/ids-adding-to-hotel.model';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {}
    

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        responseType: 'text' as 'json'
    }


    registerFirstStep(user: User): Observable<User> {
        return  this.http.post<User>(`/register/step1`,user, this.httpOptions);
    }

    registerSecondStep(person: Person): Observable<Person> {
        return  this.http.patch<Person>(`/register/step2`,person, this.httpOptions);
    }


    validateId(id:number): Observable<any> {
      return this.http.get(`/users/${id}`);
  }



getrooms(): Observable<any> {
  return this.http.get(`/fin/rooms`);
}


getOneRooms(roomName: string): Observable<any> {
  return this.http.get(`/fin/rooms/${roomName}`);
}

countRooms(): Observable<any> {
  return this.http.get(`/fin/nor`);
}


countBook(): Observable<any> {
  return this.http.get(`/book/numofbook`);
}

// ======login & logout=========

loginToSystem(user: LoginUser): Observable<LoginUser> {
  return  this.http.post<LoginUser>(`/login`,user, this.httpOptions);
}

logoutFromSystem(): Observable<any> {
  return this.http.get(`/users/logout`);
}

// ======check if cart is active======
isCartActive(): Observable<any> {
  return this.http.get(`/dashboard/cart`);
}

// ======create new cart=============
createNewCart(): Observable<any> {
  return  this.http.post<any>(`/dashboard/newcart`, this.httpOptions);
}

disactivateCart():Observable<any> {
  return  this.http.patch<any>(`/dashboard/checkout`, this.httpOptions);
}



// ======if acrt is active, get all room from cart=====

getbookRoomFromCart(): Observable<any> {
  return this.http.get(`/dashboard`);
}

// ======get all hotels======

getHotels(): Observable<any> {
  return this.http.get(`/fin/hotels`);
}

getSpecificHotel(id:number): Observable<any> {
  return this.http.get(`/fin/hotels/${id}`);
}

// ======delete booking room from cart=====

removebookFromCart(id:number): Observable<any> {
  return this.http.delete(`/dashboard/remove/${id}`);
}
removeAllbookFromCart(): Observable<any> {
  return this.http.delete(`/dashboard/removeall`);
}

// ======add booking room to cart========

addRoomToCart(item: Book): Observable<Book> {
  return  this.http.put<Book>(`/dashboard/addroom`,item, this.httpOptions);
}
// ======increment quantity of product in cart========

incBookRoomInCart(item: IncRoom): Observable<IncRoom> {
  return  this.http.patch<IncRoom>(`/dashboard/incroom`,item, this.httpOptions);
}

// ======get last booking, cart with status complete 

getLastbooking(): Observable<any> {
  return this.http.get(`/booking/lastorder`);
}

getbookingDates(): Observable<any> {
  return this.http.get(`/booking/bookingdate`);
}

Booking(book: Book): Observable<Book> {
  return  this.http.put<Book>(`/booking`,book, this.httpOptions);
}


// =======addproduct to category ======

recordToCategory(IDs: IDsToHotel): Observable<IDsToHotel> {
  return this.http.patch<IDsToHotel>(`/admin/rth`, IDs, this.httpOptions)
}

// ======name of admin ======

adminName(): Observable<any> {
  return this.http.get(`/admin`);
}



}
