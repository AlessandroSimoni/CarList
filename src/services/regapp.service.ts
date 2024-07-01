import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthappService } from './authapp.service';  // Importa AuthappService

@Injectable({
  providedIn: 'root'
})
export class RegappService {
  private currentRoute = new BehaviorSubject<string>('');

  currentRoute$ = this.currentRoute.asObservable();

  constructor(private authappService: AuthappService) { }  // Inietta AuthappService

  registerUser(username: string, email: string, password: string): void {
    console.log(`Registering user with username: ${username}`);
    sessionStorage.setItem('username', username);
    // Dopo la registrazione, imposta lo stato di autenticazione su "logged in"
    this.authappService.logIn();
  }

  setCurrentRoute(route: string) {
    console.log(`Current route set to: ${route}`);
    this.currentRoute.next(route);
  }
}
