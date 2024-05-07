import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitaUrgenteService } from '../../services/cita-urgente.service';

@Component({
  selector: 'app-formulario-cita-urgente',
  templateUrl: './formulario-cita-urgente.component.html',
  styleUrls: ['./formulario-cita-urgente.component.css']
})
export class FormularioCitaUrgenteComponent implements OnInit {
  tiposIntervencion: any[] = [];
  datosCitaLlenos: boolean = false;
  necesitaCanalizacion: boolean = false;

  constructor(private http: HttpClient, private citaUrgenteService: CitaUrgenteService) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/tipos-intervencion').subscribe(
      response => {
        this.tiposIntervencion = response;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
      }
    );

    // Suscribe al observable para mantenerse actualizado sobre el estado de los datos de la cita
    this.citaUrgenteService.datosCitaLlenos$.subscribe(value => {
      this.datosCitaLlenos = value;
    });
  }
  submitForm(): void {
    console.log('Formulario enviado');
  }
  toggleCanalizacion(): void {
    this.necesitaCanalizacion = !this.necesitaCanalizacion; // Invierte el valor de necesitaCanalizacion
  }
}
