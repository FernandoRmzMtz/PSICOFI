import { Component } from '@angular/core';
import { HistorialAlumnosService } from './services/historial-alumnos.service';
@Component({
  selector: 'app-historial-alumnos',
  templateUrl: './historial-alumnos.page.html',
  styleUrls: ['./historial-alumnos.page.css']
})
export class HistorialAlumnosPage {

  constructor(private histo: HistorialAlumnosService) { }

  get historialVisible()
  {
    return this.histo.historialTablaVisible;
  }

  back()
  {
    this.histo.historialTablaVisible = 1;
  }
}
