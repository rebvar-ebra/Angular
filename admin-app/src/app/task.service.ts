import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app/model/user';
import{Room} from './model/room';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  getUsers(){
    return this.httpClient.get<User[]>('http://localhost:5000/users/get');
  }
  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:5000/users/add', newUser);   
  }
  deleteUser(id:any) {
    return this.httpClient.delete<User>('http://localhost:5000/users/' + id);
  }

  getRooms() {
    return this.httpClient.get<Room[]>('http://localhost:5000/rooms/get');
  }
}
