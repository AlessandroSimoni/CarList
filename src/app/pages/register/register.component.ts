import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';
import { RegappService } from 'src/services/regapp.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private mat: MatDialog, private route: Router, 
    private regService: RegappService, private authappService: AuthappService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  isInvalid(control: AbstractControl | null): boolean {
    return (control?.invalid && (control.dirty || control.touched)) ?? false;
  }

  isValid(control: AbstractControl | null): boolean {
    return (control?.valid && (control.dirty || control.touched)) ?? false;
  }

  onSubmit() {
    this.error = '';
    if (this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      // Check if password respects the regex
      if (!regex.test(password)) {
        this.error = 'Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number.';
      } 
      // Check if password and confirmPassword are the same
      else if (password !== confirmPassword) {
        this.error = 'Passwords do not match. Please try again.';
      }
      // If everything is correct
      else {
        this.error = '';

        this.regService.registerUser(this.registerForm.value).subscribe(data => {
          sessionStorage.setItem('username', this.registerForm.get('username')?.value);
          this.authappService.logIn(); // Ensure this is injected as a dependency
          this.registerForm.reset();
          this.route.navigate(['home']);
        });
      }
    }
  }
}