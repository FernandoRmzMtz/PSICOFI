import { Component } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';


interface AlumnoAtendido {
  claveUnica: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  area: string;
  carrera: string;
  semestre: number;
  asesor: string;
  condicionAcademica: string;
  promedioGral: number;
  creditosAprobados: number;
  creditosInscritos: number;
  sexo: string;
  edad: number;
}

@Component({
  selector: 'app-alumno-atendido',
  templateUrl: './alumno-atendido.component.html',
  styleUrls: ['./alumno-atendido.component.css']
})

export class AlumnoAtendidoComponent {
  public clave: string = '';
  constructor(private histo: HistorialAlumnosService) {
    this.clave = histo.alumnoViendo;
    this.getAlumnoAtendidoInfo();
  }


  public getAlumnoAtendidoInfo(): void {
    this.histo.getAlumnoInfo().subscribe((data) => {
      this.histo.infoAlumno = data;
    },
      (error) => {
        console.error('Error al obtener alumno:', error);
      })
  }

  public get alumnoInfo(): AlumnoAtendido {
    return this.histo.infoAlumno;
  }
}
