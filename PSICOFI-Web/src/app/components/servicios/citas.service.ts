import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  idCita: number;
  fecha: string;
  hora: string;
  claveUnica: number;
  estado: string; 
  clavePsicologo: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) {}

  obtenerCitas(id: number): Observable<Cita[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Cita[]>('http://psicofi-api.test/cita/getDates', { params: params });
  }

  agendarCita(cita: { id: string; claveUnica: number; fecha: string; hora: string; }): Observable<number> {
    const url = 'http://psicofi-api.test/cita/scheduleDate';
    const token = localStorage.getItem('auth_token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || ''
    });
    return this.http.put<number>(url, cita, { headers });
  }
  
}




