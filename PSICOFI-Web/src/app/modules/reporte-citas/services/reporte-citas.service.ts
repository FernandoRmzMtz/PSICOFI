import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login/services/login.services';
import { Observable } from 'rxjs';
import { environment } from 'environments/enviroment';
import { Cita } from 'src/app/components/servicios/citas.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteCitasService {

  constructor(private http: HttpClient, private loginService:LoginService) { 

  }

  // getCita(idCita: number): Observable<any> {
  //   return this.http.get<any>(environment.api+`/getCita/${idCita}`);  
  getCita(idCita: number): Observable<Cita> {
    return this.http.get<Cita>(environment.api+`/getCita/${idCita}`);  
  }
}
