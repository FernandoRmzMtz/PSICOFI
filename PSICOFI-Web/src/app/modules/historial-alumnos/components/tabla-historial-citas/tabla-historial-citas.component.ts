import { Component } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';

@Component({
  selector: 'app-tabla-historial-citas',
  templateUrl: './tabla-historial-citas.component.html',
  styleUrls: ['./tabla-historial-citas.component.css']
})
export class TablaHistorialCitasComponent {

  constructor(private histo: HistorialAlumnosService){
    this.getHistorialCitas();
  };

  public getHistorialCitas(): void {
    this.histo.getHistorialCitas().subscribe((data) => {
      this.histo.records = data;
      console.log(this.histo.records)
    },
      (error) => {
        console.error('Error al obtener alumno:', error);
      })
  }

  public get records() {
    return this.histo.records;
  }
}
