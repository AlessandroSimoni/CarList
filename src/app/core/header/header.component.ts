import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDarkMode = false;

  constructor() { 
 
  }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

}
