import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AgendarCita {
    constructor(private http: HttpClient) { }

    obtenerHistorialCitas(id: number): Observable<any> {
        const url = 'http://localhost/PSICOFI-Api/public/alumno/getRecord';
        const body = { id: id };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token || ''
        });

        return this.http.post(url, body, { headers: headers });
    }

    obtenerCitasProceso(id: number): Observable<any> {
        const url = 'http://localhost/PSICOFI-Api/public/alumno/getDate';
        const body = { id: id };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token || ''
        });

        return this.http.post(url, body, { headers: headers });
    }

    obtenerAlumno(id: number): Observable<any> {
        const url = 'http://localhost/PSICOFI-Api/public/alumno/getAlumno';
        const body = { id: id };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token || ''
        });

        return this.http.post(url, body, { headers: headers });
    }

    obtenerPsicologos(): Observable<any> {
        const url = 'http://localhost/PSICOFI-Api/public/psicologo/getPsicologos';
        const body = { activo: 1 };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token || ''
        });

        return this.http.post(url, body, { headers: headers });
    }
}
