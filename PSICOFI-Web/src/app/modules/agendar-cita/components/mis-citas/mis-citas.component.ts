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

  constructor(private agendarCitaService: AgendarCita, private loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerDatosAlumno();
  }

  obtenerDatosAlumno(): void {
    const clave = this.loginService.getClave();
    const id = parseInt(clave, 10);
    this.agendarCitaService.obtenerAlumno(id).subscribe(
      (data) => {
        this.claveUnica = data.claveUnica;
        this.nombre = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
        this.obtenerHistorialCitas();
        this.obtenerCitasProceso();
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
