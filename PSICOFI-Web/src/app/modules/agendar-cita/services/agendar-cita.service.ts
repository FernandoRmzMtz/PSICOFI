import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, switchMap, throwError , of } from "rxjs";
import { CsrfServiceService } from "src/app/servicios/csrfService/csrf-service.service";
@Injectable({
    providedIn: 'root'
})
export class AgendarCita {
    constructor(private http: HttpClient, private csrfService: CsrfServiceService) { }
    private citaAgendadaSubject = new BehaviorSubject<boolean>(false);
    private citaCanceladaSubject = new Subject<void>();

    obtenerHistorialCitas(id: number): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        const url = 'http://localhost/PSICOFI-Api/public/alumno/getRecord';
        const body = { id: id };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': token || ''
            'X-CSRF-TOKEN': csrfToken || ''
        });

        return this.http.post(url, body, { headers: headers, withCredentials:true });
    }

    obtenerCitasProceso(id: number): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        // return this.csrfService.getCsrfCookie().pipe(
        //     switchMap(() => {
        //         const csrfToken = this.csrfService.getCsrf();
        //         if (!csrfToken) {
        //             return throwError('No se pudo obtener el token CSRF.');
        //         }
                const url = 'http://localhost/PSICOFI-Api/public/alumno/getDate';
                const body = { id: id };
                const token = localStorage.getItem('auth_token'); 
                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': token || ''
                    'X-CSRF-TOKEN': csrfToken || '',
                });

                return this.http.post(url, body, { headers: headers, withCredentials:true }).pipe(
                    catchError(error => {
                        console.error('Error al obtener las citas en proceso:', error);
                        return of(null);
                    })
                );
            // })
        // );
    }

    crearCitas(id: string, fecha: string, horas: string[], token: string): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        const url = 'http://localhost/PSICOFI-Api/public/cita/createDates';
        const body = { id, fecha, horas };
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('X-CSRF-TOKEN', token);
        return this.http.post<any>(url, body, { headers: headers, withCredentials:true });
      }

    obtenerAlumno(id: number): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        const url = 'http://localhost/PSICOFI-Api/public/alumno/getAlumno';
        const body = { id: id };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': token || ''
            'X-CSRF-TOKEN': csrfToken || '',
        });

        // console.log(csrfToken, headers);

        return this.http.post(
            url, 
            body, 
            { headers: headers,
                withCredentials: true,
             },
        );
    }

    obtenerPsicologos(): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        const url = 'http://localhost/PSICOFI-Api/public/psicologo/getPsicologos';
        const body = { activo: 1 };
        const token = localStorage.getItem('auth_token'); 
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': token || ''
            'X-CSRF-TOKEN': csrfToken || ''
        });

        return this.http.post(url, body, { headers: headers, withCredentials: true });
    }

    cancelarCita(idCita: number, id: string): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        const url = 'http://localhost/PSICOFI-Api/public/cita/cancelDate';
        const body = { idCita, id };
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': token || ''
            'X-CSRF-TOKEN': csrfToken || ''
        });

        return this.http.post(url, body, { headers: headers, withCredentials:true });
    }

    confirmarCita(idCita: number, id: string): Observable<any> {
        const csrfToken = this.csrfService.getCsrf();

        const url = 'http://localhost/PSICOFI-Api/public/cita/confirmDate';
        const body = { idCita, id };
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': token || ''
            'X-CSRF-TOKEN': csrfToken || ''
        });

        return this.http.post(url, body, { headers:headers, withCredentials:true });
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

