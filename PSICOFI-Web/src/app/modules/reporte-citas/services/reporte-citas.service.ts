import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login/services/login.services';
import { Observable } from 'rxjs';
import { environment } from 'environments/enviroment';
import { Cita } from 'src/app/components/servicios/citas.service';
import { Alumno } from 'src/app/model/alumno.model';
import { NotaCita } from 'src/app/model/nota-cita.model';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteCitasService {

  constructor(private http: HttpClient, private loginService:LoginService, private csrfService:CsrfServiceService) { 

  } 
  getCita(idCita: number): Observable<Cita> {
    return this.http.get<Cita>(environment.api+`/getCita/${idCita}`);  
  }
  getNotaCita(idCita: number): Observable<NotaCita> {
    return this.http.get<NotaCita>(environment.api+`/getNotaCita/${idCita}`);  
  }
  getAlumno(claveUnica: number): Observable<Alumno> {
    return this.http.get<Alumno>(environment.api+`/alumno/${claveUnica}`);  
  }
}
