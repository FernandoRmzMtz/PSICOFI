import { Component, OnInit } from '@angular/core';
import { AgendarCita } from '../../services/agendar-cita.service';
import { LoginService } from 'src/app/modules/login/services/login.services';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  claveUnica: string = '';
  nombre: string = '';
  tieneCita: boolean = false;
  citasProceso: any[] = [];
  historialCitas: any[] = [];
  idCitaActual: number | null = null;

  constructor(private agendarCitaService: AgendarCita, private loginService: LoginService) { 
    this.citasProceso = []; 
    this.idCitaActual = null; 
  }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
    this.agendarCitaService.citaAgendada$.subscribe(() => {
      this.obtenerCitasProceso();
    });
  }

  obtenerDatosAlumno(): void {
    const clave = this.loginService.getClave();
    const id = parseInt(clave, 10);
    this.agendarCitaService.obtenerAlumno(id).subscribe(
      (data) => {
        if (data) {
          this.claveUnica = data.claveUnica;
          this.nombre = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
          this.obtenerHistorialCitas();
          this.obtenerCitasProceso();
        } else {
          console.error('No se encontraron datos del alumno');
        }
      },
      (error) => {
        console.error('Error al obtener los datos del alumno:', error);
      }
    );
  }

  obtenerHistorialCitas(): void {
    const id = parseInt(this.claveUnica, 10);
    this.agendarCitaService.obtenerHistorialCitas(id).subscribe(
      (data) => {
        this.historialCitas = data;
      },
      (error) => {
        console.error('Error al obtener el historial de citas:', error);
      }
    );
  }

  obtenerCitasProceso(): void {
    const idAlumno = parseInt(this.claveUnica, 10);
    this.agendarCitaService.obtenerCitasProceso(idAlumno).subscribe(
      (data: any) => {
        if (Array.isArray(data) && data[0] === 'Sin cita agendada') {
          this.tieneCita = false;
          console.log('No hay citas en proceso.');
        } else if (data) {
          this.citasProceso = [];
          this.idCitaActual = data.idCita;
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
    if (this.idCitaActual !== null) {
        this.agendarCitaService.cancelarCita(this.idCitaActual, this.claveUnica).subscribe(
            (response) => {
                console.log('Cita cancelada:', response);
                this.tieneCita = false;
                this.citasProceso = [];
                this.idCitaActual = null;
                this.agendarCitaService.setCitaAgendada(false);
                this.agendarCitaService.emitirCitaCancelada();
            },
            (error) => {
                console.error('Error al cancelar la cita:', error);
            }
        );
    }
}

  confirmarCita(): void {
    if (this.idCitaActual !== null) {
      this.agendarCitaService.confirmarCita(this.idCitaActual, this.claveUnica).subscribe(
        (response) => {
          console.log('Cita confirmada:', response);
        },
        (error) => {
          console.error('Error al confirmar la cita:', error);
        }
      );
    }
  }
}
