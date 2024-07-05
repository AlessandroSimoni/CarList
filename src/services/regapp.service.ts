import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthappService } from './authapp.service';  // Importa AuthappService
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegappService {
  private apiUrl = 'http://localhost:3000/users';
  private currentRoute = new BehaviorSubject<string>('');

  currentRoute$ = this.currentRoute.asObservable();

  constructor(private authappService: AuthappService, private http: HttpClient) { }  // Inietta AuthappService

  registerUser(user: any): Observable<any> {
    // Salva i dati dell'utente nel database
    return this.http.post<any>(this.apiUrl, user);
  }

  setCurrentRoute(route: string) {
    console.log(`Current route set to: ${route}`);
    this.currentRoute.next(route);
  }
}
