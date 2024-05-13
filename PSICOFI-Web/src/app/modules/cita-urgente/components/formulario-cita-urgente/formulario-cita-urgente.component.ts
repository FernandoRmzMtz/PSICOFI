import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitaUrgenteService } from '../../services/cita-urgente.service';
import { LoginService } from 'src/app/modules/login/services/login.services';

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

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/tipos-intervencion').subscribe(
      response => {
        this.tiposIntervencion = response;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
      }
    );

    this.http.get<any[]>('http://localhost:8000/api/departamentos').subscribe(
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

    

    // Crear el objeto con los datos del formulario
    const formData = {
      tipoIntervencion: this.tipoIntervencion ? this.tipoIntervencion:1,
      notas: this.notas,
      departamento: this.departamento ? this.departamento: "",
      detalleCanalizacion: this.necesitaCanalizacion ? this.detalleCanalizacion : "", // Si necesita canalización, incluir los detalles
      // Agregar otros campos según sea necesario
      idCita: 1
    };

    console.log(formData);

    // Enviar los datos al servidor
    this.http.post<any>('http://localhost:8000/api/nota-cita', 
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
        // Aquí podrías realizar alguna acción adicional, como mostrar un mensaje de éxito o redirigir a otra página
      },
      error => {
        console.error('Error al enviar los datos:', error);
        // Aquí podrías manejar el error de alguna manera, como mostrar un mensaje de error al usuario
      }
    );
  }
  toggleCanalizacion(): void {
    this.necesitaCanalizacion = !this.necesitaCanalizacion; // Invierte el valor de necesitaCanalizacion
  }
}
