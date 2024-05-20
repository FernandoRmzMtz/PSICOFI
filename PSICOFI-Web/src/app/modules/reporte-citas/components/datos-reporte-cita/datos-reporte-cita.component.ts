import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';

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
    private reporteCitaService:ReporteCitasService){

  }
  idCita =0;
  public cita : Cita | null = null;

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
      },
      error => {
        console.error('Error al obtener la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }

  public alumno = 
    {
    'claveUnica' : '324109',
    'nombres' : 'Fernando Antonio',
    'apellidoPaterno' : 'Ramírez',
    'apellidoMaterno' : 'Martínez',
    'edad' : 21,
    'sexo' : 'M',
    'area' : 'Ciencias de la computación',
    'carrera' : 'Ing. en sistemas inteligentes',
    'semestre' : 8,
    'condicionAcademica' : 'INSCRITO',
    'creditosAprobados' : 345,
    'creditosInscritos' : 48,
    'promedioGral' : 9.4,
    'asesor' : 'Dra. Sandra Edith Nava Muñoz',
    'contrasena' : '1234567890',
    'habilitado' : true,
    };


}
