import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';
import { Alumno } from 'src/app/model/alumno.model';

@Component({
  selector: 'app-datos-reporte-cita',
  templateUrl: './datos-reporte-cita.component.html',
  styleUrls: ['./datos-reporte-cita.component.css']
})
export class DatosReporteCitaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http:HttpClient, 
    private _router:Router, 
    private reporteCitaService:ReporteCitasService
  ){

  }
  idCita =0;
  public cita : Cita | null = null;
  public alumno : Alumno | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCita = +params.get('idCita')!;
      console.log("id de cita:"+this.idCita);
      if (this.idCita) {
        this.getCita(this.idCita);
      }
    });  
  }

  getCita(idCita: number): void {
    this.reporteCitaService.getCita(idCita).subscribe(
      response => {
        this.cita = response;
        console.log('Cita obtenida:', this.cita);
        this.getAlumno(this.cita.claveUnica);
      },
      error => {
        console.error('Error al obtener la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }

  getAlumno(claveUnica: number): void {
    this.reporteCitaService.getAlumno(claveUnica).subscribe(
      response => {
        this.alumno = response;
        console.log('Alumno obtenido:', this.alumno);
      },
      error => {
        console.error('Error al obtener la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }


}
