import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/core/dialog-box/dialog-box.component';
import { AuthappService } from 'src/services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username: string = '';
  @Input() password: string = '';
  error: string = '';

  constructor(public dialog: MatDialog, private router: Router, private basicAuth: AuthappService) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Disable',
      message: 'We are so sorry, but this feature is not available yet.😢'
    };
    this.dialog.open(DialogBoxComponent, dialogConfig);
  }

  login(): void {
    console.log(`Attempting to login with username: ${this.username}`);
    if (this.basicAuth.authenticate(this.username, this.password)){
      console.log('Login successful, navigating to home');
      this.router.navigate(['home']);
    } else {
      console.log('Login failed');
      this.error = 'Username or password is incorrect. Please try again.';
    }
  }

  ngOnInit(): void {}
}
