import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {
  private currentRoute = new BehaviorSubject<string>('');
  private isLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  currentRoute$ = this.currentRoute.asObservable();
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() { }

  authenticate(username: string, password: string): boolean {
    if (username === 'Alessandro' && password === 'Speriamovadatuttobene') {
      sessionStorage.setItem('username', username);
      this.isLoggedIn.next(true); // Aggiorna lo stato di autenticazione
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    this.isLoggedIn.next(false); // Aggiorna lo stato di autenticazione
  }

  setCurrentRoute(route: string) {
    console.log(`Current route set to: ${route}`);
    this.currentRoute.next(route);
  }
}
