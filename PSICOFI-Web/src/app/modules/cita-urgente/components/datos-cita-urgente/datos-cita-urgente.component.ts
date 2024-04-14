import { Component } from '@angular/core';
import { CitaUrgenteService } from '../../services/cita-urgente.service';

@Component({
  selector: 'app-datos-cita-urgente',
  templateUrl: './datos-cita-urgente.component.html',
  styleUrls: ['./datos-cita-urgente.component.css']
})
export class DatosCitaUrgenteComponent {

  claveUnica: number = 0;
  alumno: any = {};
  buscado: boolean = false;
  encontrado: boolean = false;

  constructor(private citaUrgenteService: CitaUrgenteService) {}

  ngOnInit(): void {
  }

  buscarAlumno() {
    this.buscado = true;
    if(this.claveUnica) {
      this.citaUrgenteService.obtenerAlumno(this.claveUnica).subscribe(
        response => {
          this.alumno = response;
          this.encontrado = true;
        },
        error => {
          this.encontrado = false;
          console.error('Error al obtener alumno:', error);
        }
      );
    } else {
      this.claveUnica = 0;
      this.alumno = {};
      this.encontrado = false;
    }
    
  }

public cita = {
    'fecha': '16/04/2024',
    'hora': '12:00',
    'claveUnica': 1,
    'estadoCita': 1,
    'clavePsicologo': 1,
    'clavePsicologoExterno': null,
};
}
