import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/core/dialog-box/dialog-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Disable',
      message: 'We are so sorry, but this feature is not available yet.😢'
    };
    this.dialog.open(DialogBoxComponent, dialogConfig);
  }

  ngOnInit(): void {
  }

}
