import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-formulario-cita-urgente',
  templateUrl: './formulario-cita-urgente.component.html',
  styleUrls: ['./formulario-cita-urgente.component.css']
})
export class FormularioCitaUrgenteComponent implements OnInit {
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
