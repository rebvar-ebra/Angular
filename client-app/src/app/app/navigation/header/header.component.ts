import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // outpitthe menu
  @Output() SideNavigationToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleOpenSidenav(){
      this.SideNavigationToggle.emit();
  }

}
