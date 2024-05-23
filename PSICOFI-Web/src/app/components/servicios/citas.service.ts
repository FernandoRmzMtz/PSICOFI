import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  idCita: number;
  clavePsicologo: string;
  clavePsicologoExterno?: string;
  hora: string;
  fecha: string;
  estado: string;
  claveUnica: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) {}
  
  obtenerCitas(id: string): Observable<Cita[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Cita[]>('http://psicofi-api.test/cita/getDates', { params: params });
  }

  agendarCita(cita: { id: string; claveUnica: number; fecha: string; hora: string; }): Observable<any[]> {
    const url = 'http://psicofi-api.test/cita/scheduleDate';
    const token = localStorage.getItem('auth_token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || ''
    });
    return this.http.put<any[]>(url, cita, { headers });
  }

  crearCitas(data: { id: string, fecha: string, horas: string[] }): Observable<any> {
    const url = 'http://localhost/PSICOFI-Api/public/cita/createDates';
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || ''
    });
    return this.http.post<any>(url, data, { headers });
  }

  cancelarCita(data: { idCita: number, id: string }): Observable<any> {
    const url = 'http://localhost/PSICOFI-Api/public/cita/cancelDate';
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || ''
    });
    return this.http.post<any>(url, data, { headers });
  }

  confirmarCita(data: { idCita: number, id: string }): Observable<any> {
    const url = 'http://localhost/PSICOFI-Api/public/cita/confirmDate';
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || ''
    });
    return this.http.post<any>(url, data, { headers });
  }
}