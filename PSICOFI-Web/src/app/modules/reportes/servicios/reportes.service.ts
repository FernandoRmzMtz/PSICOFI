import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "environments/enviroment";
import { catchError } from 'rxjs/operators'; @Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  obtenerAreasCarreras(tipo: string): Observable<any> {
    if (tipo !== 'carrera' && tipo !== 'area') {
      return of({ error: 'Consulta incorrecta' });
    }

    const url = environment.api+'/reporte/getAreasCarreras';
    const data = { tipo: tipo }; 
    const token = localStorage.getItem('auth_token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || '' 
    });

    return this.http.post<any>(url, data, { headers: headers }).pipe(
      catchError(error => of({ error: 'Sin datos' }))
    );
  }


  // Método para obtener el reporte
  obtenerReporte(tipo: string, nombre: string = '', fechaInicio: string = '', fechaFin: string = ''): Observable<any> {
    if (tipo !== 'carrera' && tipo !== 'area' && tipo !== 'facultad') {
      return of({ error: 'Consulta incorrecta' });
    }

    const url = 'http://localhost/PSICOFI-Api/public/reporte/getReporte';
    const body: any = { tipo: tipo, nombre: nombre, fecha_inicio: fechaInicio, fecha_final: fechaFin };
    const token = localStorage.getItem('auth_token'); 

    if (tipo === 'facultad') {
      delete body.nombre;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': token || '' 
    });

    return this.http.post<any>(url, body, { headers: headers }).pipe(
      catchError(error => of({ error: 'Sin datos' }))
    );
  }
}