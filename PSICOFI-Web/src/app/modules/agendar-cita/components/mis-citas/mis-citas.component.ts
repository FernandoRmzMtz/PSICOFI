import { Component, OnInit } from '@angular/core';
import { AgendarCita } from '../../services/agendar-cita.service';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  claveUnica: string = '324109';
  nombre: string = 'Fernando Antonio Ramírez Martínez';
  tieneCita: boolean = true; 
  citasProceso: any[] = [ ];
  historialCitas: any[] = [];

  constructor(private agendarCitaService: AgendarCita) { }

  ngOnInit(): void {
    this.obtenerHistorialCitas();
    this.obtenerCitasProceso();
  }

  obtenerHistorialCitas(): void {
    const id = 324109;  
    this.agendarCitaService.obtenerHistorialCitas(id).subscribe(
      (data) => {
        this.historialCitas = data;
      },
      (error) => {
        console.error('Error al obtener el historial de citas:', error);
      }
    );
  }
  obtenerCitasProceso() {
    const idAlumno = 324109; 
    this.agendarCitaService.obtenerCitasProceso(idAlumno).subscribe(
      (data: any) => {
        if (data) {
          this.citasProceso.push({
            fecha: data.fecha,
            hora: data.hora,
            psicologo: `${data['Nombres psicologo']} ${data['Apellido Pat psicologo']} ${data['Apellido Mat psicologo']}`
          });
          this.tieneCita = true;
        }
      },
      (error) => {
        console.error('Error al obtener las citas en proceso:', error);
      }
    );
  }
  cancelarCita(): void {
    this.tieneCita = false;
  }
}
