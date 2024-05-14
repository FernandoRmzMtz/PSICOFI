import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CsrfServiceService {

  constructor(private http: HttpClient) { }

  getCsrfToken() {
    return this.http.get<any>(environment.api+'/csrf-token');
  }
  
}
