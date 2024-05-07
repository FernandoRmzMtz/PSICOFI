import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaUrgenteService {

  constructor(private http: HttpClient) { }

  obtenerAlumno(claveUnica: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/alumno/${claveUnica}`);
  }
  private datosCitaLlenosSource = new BehaviorSubject<boolean>(false);
  datosCitaLlenos$ = this.datosCitaLlenosSource.asObservable();

  setDatosCitaLlenos(value: boolean) {
    this.datosCitaLlenosSource.next(value);
  }

}