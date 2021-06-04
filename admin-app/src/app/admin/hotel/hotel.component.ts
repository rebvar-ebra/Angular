import { Component, OnInit } from '@angular/core';
import{Room} from '../../model/room';
import { HttpClientService } from '../../task.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class BooksComponent implements OnInit {

  rooms?: Array<Room>;

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
   this.httpClientService.getRooms().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
  }

  handleSuccessfulResponse(response:any) {
    this.rooms = response;
  }
}
