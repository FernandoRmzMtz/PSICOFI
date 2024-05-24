import { Component } from '@angular/core';
import { HistorialAlumnosService } from '../../services/historial-alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-historial-citas',
  templateUrl: './tabla-historial-citas.component.html',
  styleUrls: ['./tabla-historial-citas.component.css']
})
export class TablaHistorialCitasComponent {

  constructor(private histo: HistorialAlumnosService, private router: Router){
    this.getHistorialCitas();
  };
  public isLoading = false;
  public getHistorialCitas(): void {
    this.isLoading = true;
    this.histo.getHistorialCitas().subscribe((data) => {
      this.histo.records = data;
      this.isLoading = false;
    },
      (error) => {
        console.error('Error al obtener alumno:', error);
        this.isLoading = false;
      })
  }

  public get records() {
    return this.histo.records;
  }

  redirectToReporteCitas(id:number) {
    this.router.navigate(['/reporte-citas', id]);
  }
}
