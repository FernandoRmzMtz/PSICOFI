import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/enviroment';
import { LoginService } from 'src/app/modules/login/services/login.services';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';


@Injectable({
  providedIn: 'root'
})
export class CitaUrgenteService {
  private fecha: string = "";
  private hora: string = "";
  private claveUnica: number = -1;
  private estadoCita: number = 4;
  private clavePsicologo: null| number = -1;
  private clavePsicologoExterno: null| string = "-1";
  private csrfToken: string | null = null;


  constructor(private http: HttpClient, private loginService:LoginService, private csrfService: CsrfServiceService) {
  }

  obtenerAlumno(claveUnica: number): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();

    return this.http.post<any>(environment.api+'/alumno/getAlumno',
      {
        "id":claveUnica
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }
    );
  }
  private datosCitaLlenosSource = new BehaviorSubject<boolean>(false);
  datosCitaLlenos$ = this.datosCitaLlenosSource.asObservable();

  setDatosCitaLlenos(value: boolean) {
    this.datosCitaLlenosSource.next(value);
  }

  setDatosCita(fecha:string,hora:string,claveUnica:number,clavePsicologo:number|null,clavePsicologoExterno:string|null): void {
    this.fecha = fecha;
    this.hora = hora;
    this.claveUnica= claveUnica;
    this.estadoCita = 4;
    this.clavePsicologo = clavePsicologo;
    this.clavePsicologoExterno = clavePsicologoExterno;
  }

  getDatosCita(){
    return [
      this.fecha,
      this.hora,
      this.claveUnica,
      this.estadoCita,
      this.clavePsicologo,
      this.clavePsicologoExterno
    ];
  }

  crearCita(citaData: any): Observable<any> {
    const csrfToken = this.csrfService.getCsrf();

    console.log("estos son los datos de la cita:"+citaData);
    console.log(citaData);
    return this.http.post<any>(environment.api+'/api/crear-cita', citaData,
    {
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
        'X-CSRF-TOKEN': csrfToken || ''
      },
      withCredentials:true
    }
    );
  }

}