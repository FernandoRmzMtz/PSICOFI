import { Component, OnInit } from '@angular/core';
import { CitaUrgenteService } from '../../services/cita-urgente.service';

@Component({
  selector: 'app-datos-cita-urgente',
  templateUrl: './datos-cita-urgente.component.html',
  styleUrls: ['./datos-cita-urgente.component.css']
})
export class DatosCitaUrgenteComponent {

  claveUnica: number | null = null;
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
          if(response.claveUnica){
            this.alumno = response;
            this.encontrado = true;
          }
          else{
            this.encontrado = false;
            this.claveUnica = null;
            this.citaUrgenteService.setDatosCitaLlenos(false);
            console.error('No se encontró el alumno con la clave unica introducida.');
          }
          console.log('Alumno encontrado: ',this.alumno);
        },
        error => {
          this.encontrado = false;
          this.claveUnica = null;
          console.error('Error al intentar obtener alumno:', error);
        }
      );
    } else {
      this.claveUnica = null;
      this.alumno = {};
      this.encontrado = false;
    }
    
  }

public cita = {
    'fecha': '',
    'hora': '',
    'claveUnica': null,
    'estadoCita': 1,
    'clavePsicologo': 1,
    'clavePsicologoExterno': null,
};


  actualizarCita() {
    if (this.cita.fecha && this.cita.hora && this.cita.claveUnica) {
      this.citaUrgenteService.setDatosCitaLlenos(true); // Si todos los campos están llenos, actualiza datosCitaLlenos a true
    } else {
      this.citaUrgenteService.setDatosCitaLlenos(false); 
    }
  }
}
