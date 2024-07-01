import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarserviceService {
  private apiUrl = 'http://localhost:3000/cars';
  
  constructor(private http: HttpClient) { }
  
  //Add car method that get form data and stamp it to the console
  addCar(car: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, car);
  }

}
