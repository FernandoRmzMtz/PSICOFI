import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AgendarCita {
    constructor(private http: HttpClient) { }
    private citaAgendadaSubject = new BehaviorSubject<boolean>(false);
    private citaCanceladaSubject = new Subject<void>();

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

        return this.http.post(url, body, { headers: headers }).pipe(
            catchError(error => {
                console.error('Error al obtener las citas en proceso:', error);
                return of(null);
            })
        );
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

    cancelarCita(idCita: number, id: string): Observable<any> {
        const url = 'http://localhost/PSICOFI-Api/public/cita/cancelDate';
        const body = { idCita, id };
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token || ''
        });

        return this.http.post(url, body, { headers });
    }

    confirmarCita(idCita: number, id: string): Observable<any> {
        const url = 'http://localhost/PSICOFI-Api/public/cita/confirmDate';
        const body = { idCita, id };
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token || ''
        });

        return this.http.post(url, body, { headers });
    }
    
    setCitaAgendada(state: boolean) {
        this.citaAgendadaSubject.next(state);
    }
    
    getCitaAgendada(): Observable<boolean> {
        return this.citaAgendadaSubject.asObservable();
    }
    
    citaAgendada$ = this.citaAgendadaSubject.asObservable();
   
    emitirCitaAgendada() {
        this.citaAgendadaSubject.next(true);
    }
    
    emitirCitaCancelada() {
        this.citaCanceladaSubject.next();
    }

    getCitaCancelada(): Observable<void> {
        return this.citaCanceladaSubject.asObservable();
    }

}

