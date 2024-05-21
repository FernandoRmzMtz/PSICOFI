import { Component, Input, Output } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service'

@Component({
  selector: 'app-tabla-alumnos',
  templateUrl: './tabla-alumnos.component.html',
  styleUrls: ['./tabla-alumnos.component.css']
})
export class TablaAlumnosComponent {

  @Input()
  public pacientes=[];

  constructor(private histo: HistorialAlumnosService){}

  public verAlumnoAtendido(clave: number): void {
    this.histo.verAlumno(clave);
  }
}
