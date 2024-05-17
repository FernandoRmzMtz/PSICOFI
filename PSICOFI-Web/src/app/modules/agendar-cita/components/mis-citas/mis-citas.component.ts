import { Component, OnInit } from '@angular/core';
import { AgendarCita } from '../../services/agendar-cita.service';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  claveUnica: string = '12345';
  nombre: string = 'Juan Pérez';
  tieneCita: boolean = true; 
  citasProceso: any[] = [
    { fecha: '10/03/2024', hora: '10:00', psicologo: 'Psicólogo 1' }
  ];
  historialCitas: any[] = [];

  constructor(private agendarCitaService: AgendarCita) { }

  ngOnInit(): void {
    this.obtenerHistorialCitas();
  }

  obtenerHistorialCitas(): void {
    const id = 167565; // Asigna el ID correspondiente
    this.agendarCitaService.obtenerHistorialCitas(id).subscribe(
      (data) => {
        this.historialCitas = data;
      },
      (error) => {
        console.error('Error al obtener el historial de citas:', error);
      }
    );
  }

  cancelarCita(): void {
    this.tieneCita = false;
  }
}
