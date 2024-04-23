import { Component } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';

@Component({
  selector: 'app-alumno-atendido',
  templateUrl: './alumno-atendido.component.html',
  styleUrls: ['./alumno-atendido.component.css']
})
export class AlumnoAtendidoComponent {

  constructor(private histo: HistorialAlumnosService){}
  

}
