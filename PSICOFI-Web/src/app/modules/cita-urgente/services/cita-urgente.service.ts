import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  obtenerAlumno(claveUnica: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/alumno/${claveUnica}`);
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
    return this.http.post<any>('http://localhost:8000/api/crear-cita', citaData);
  }

}