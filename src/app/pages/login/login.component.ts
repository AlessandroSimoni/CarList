import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/core/dialog-box/dialog-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: string = '';
  @Input() password: string = '';
  error: string = '';

  constructor(public dialog: MatDialog, private router: Router) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Disable',
      message: 'We are so sorry, but this feature is not available yet.😢'
    };
    this.dialog.open(DialogBoxComponent, dialogConfig);
  }

  login() {
    if (this.username != 'Alessandro' || this.password != 'Speriamovadatuttobene') {
      this.error = 'Username or password is incorrect. Please try again.';
    }else{
      // Redirect to the welcome page with Router service passing the username
      this.router.navigate(['/home', this.username]);
    }
  }

  ngOnInit(): void {
  }

}
