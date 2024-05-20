import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitaUrgenteService } from '../../services/cita-urgente.service';
import { LoginService } from 'src/app/modules/login/services/login.services';
import { environment } from 'environments/enviroment';

@Component({
  selector: 'app-formulario-cita-urgente',
  templateUrl: './formulario-cita-urgente.component.html',
  styleUrls: ['./formulario-cita-urgente.component.css']
})
export class FormularioCitaUrgenteComponent implements OnInit {
  tiposIntervencion: any[] = [];
  departamentos: any[] = [];
  datosCitaLlenos: boolean = false;
  necesitaCanalizacion: boolean = false;

  constructor(private http: HttpClient, private citaUrgenteService: CitaUrgenteService,private loginService: LoginService) { }

  // Propiedades para los datos del formulario
  tipoIntervencion: number | null = null;
  notas: string = '';
  departamento: string = '';
  detalleCanalizacion: string = '';
  alumnoForaneo: boolean | null = null;
  datosCita: Array<any> = [];

  ngOnInit(): void {



    this.http.get<any[]>(environment.api+'/tipos-intervencion').subscribe(
      response => {
        this.tiposIntervencion = response;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
      }
    );

    this.http.get<any[]>(environment.api+'/departamentos').subscribe(
      response => {
        this.departamentos = response;
      },
      error => {
        console.error('Error al obtener departamentos:', error);
      }
    );

    // Suscribe al observable para mantenerse actualizado sobre el estado de los datos de la cita
    this.citaUrgenteService.datosCitaLlenos$.subscribe(value => {
      this.datosCitaLlenos = value;
    });
  }
  submitForm(): void {

    this.datosCita = this.citaUrgenteService.getDatosCita();
    console.log(this.datosCita);

    // Crear la cita
    const citaData = {
      fecha: this.datosCita[0],
      hora: this.datosCita[1],
      claveUnica: this.datosCita[2],
      estadoCita: this.datosCita[3],
      clavePsicologo: this.datosCita[4],
      clavePsicologoExterno: this.datosCita[5],
    };

    console.log(citaData);

    this.citaUrgenteService.crearCita(citaData).subscribe(
      (response: any) => {
        const idCita = response.idCita;

        // Crear el objeto con los datos del formulario
        const formData = {
          tipoIntervencion: this.tipoIntervencion,
          notas: this.notas,
          departamento: this.departamento ? this.departamento: "",
          detalleCanalizacion: this.necesitaCanalizacion ? this.detalleCanalizacion : "", // Si necesita canalización, incluir los detalles
          idCita: idCita
        };

        console.log(formData);

        // Enviar los datos al servidor
        this.http.post<any>(environment.api+'/api/nota-cita', 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
          }
        },
        ).subscribe(
          response => {
            console.log('Datos enviados correctamente:', response);
            window.location.reload();
          },
          error => {
            console.error('Error al enviar los datos:', error);
          }
        );
    },
    (error: any) => {
      console.error('Error al crear la cita:', error);
    }
  );
  }
  toggleCanalizacion(): void {
    this.necesitaCanalizacion = !this.necesitaCanalizacion; // Invierte el valor de necesitaCanalizacion
  }
}
