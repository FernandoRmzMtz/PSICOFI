import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  obtenerReporte(tipoReporte: string, id: number): Observable<any> {
    // Ruta de la API (descomentar cuando esté disponible)
    // const url = 'http://localhost/PSICOFI-Api/public/reportes/getReport';
    // const body = { tipoReporte: tipoReporte, id: id };
    // const token = localStorage.getItem('auth_token'); 
    // const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'X-CSRF-TOKEN': token || ''
    // });

    // return this.http.post(url, body, { headers: headers });

    // Datos simulados en función del tipo de reporte
    let datosSimulados: any = {};

    switch (tipoReporte) {
      case 'carrera':
        datosSimulados = {
          "totalPersonasAtendidas": 50,
          "totalCitas": 90,
          "horarioAtencion": [
            ["9:00", 30],
            ["10:00", 45],
            ["11:00", 15]
          ],
          "semestre": [
            ["1°", 20],
            ["9°", 30]
          ],
          "areaConsulta": [
            ["Psicologica", 20],
            ["Pedagogica", 30]
          ],
          "motivoConsulta": [
            ["Academica", 30],
            ["Emocional", 40],
            ["Social", 15],
            ["Otra", 5]
          ]
        }
        break;
      case 'area':
        datosSimulados = {
          "totalPersonasAtendidas": 40,
          "totalCitas": 90,
          "Horario de Atención": [
            ["9:00", 40],
            ["10:00", 15],
            ["11:00", 35]
          ],
          "Semestre": [
            ["1°", 20],
            ["9°", 10],
            ["3°", 10]
          ],
          "Area de la consulta": [
            ["Psicologica", 35],
            ["Pedagogica", 5]
          ],
          "Motivo de la consulta": [
            ["Academica", 25],
            ["Emocional", 50],
            ["Social", 10],
            ["Otra", 5]
          ],
          "Personas por carrera": [
            ["Computación", 10],
            ["Medicina", 15],
            ["Derecho", 15]
          ]
        }
        break;
      case 'facultad':
        datosSimulados = {
          "totalPersonasAtendidas": 70,
          "totalCitas": 90,
          "horarioAtencion": [
            ["9:00", 30],
            ["10:00", 20],
            ["11:00", 40]
          ],
          "semestre": [
            ["1°", 35],
            ["9°", 35]
          ],
          "areaConsulta": [
            ["Psicologica", 50],
            ["Pedagogica", 40]
          ],
          "motivoConsulta": [
            ["Academica", 40],
            ["Emocional", 25],
            ["Social", 20],
            ["Otra", 5]
          ],
          "personasPorCarrera": [
            ["Computación", 20],
            ["Sistemas", 15],
            ["Diseño", 35]
          ]
          ,
          "personasPorArea": [
            ["Ciencias de la Computacion", 35],
            ["Habitat", 35]
          ]
        }

        break;
      default:
        throw new Error("Tipo de reporte no válido");
    }

    return of(datosSimulados);
  }
}
