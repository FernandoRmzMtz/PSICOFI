import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsrfServiceService {

  constructor(private http: HttpClient) { }

  getCsrfToken() {
    return this.http.get<any>('http://localhost:8000/csrf-token');
  }
  
}
