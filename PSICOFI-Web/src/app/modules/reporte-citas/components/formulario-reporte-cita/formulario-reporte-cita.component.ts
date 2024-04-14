import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-formulario-reporte-cita',
  templateUrl: './formulario-reporte-cita.component.html',
  styleUrls: ['./formulario-reporte-cita.component.css']
})
export class FormularioReporteCitaComponent implements OnInit {
  tiposIntervencion: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/tipos-intervencion').subscribe(
      response => {
        this.tiposIntervencion = response;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
      }
    );
  }
  submitForm(): void {
    console.log('Formulario enviado');
  }
}
