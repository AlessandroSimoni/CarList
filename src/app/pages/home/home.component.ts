import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/core/dialog-box/dialog-box.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = sessionStorage.getItem('username');

  constructor(public dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Disable',
      message: 'We are so sorry, but this feature is not available yet.😢'
    };
    this.dialog.open(DialogBoxComponent, dialogConfig);
  }

  addCart() {
    this.route.navigate(['add-car']);
  }

}
