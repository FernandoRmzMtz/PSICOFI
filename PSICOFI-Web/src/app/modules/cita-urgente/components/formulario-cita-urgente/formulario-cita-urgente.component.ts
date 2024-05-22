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
  visible = false;
  error = false;
  errorCita = false;
  errorIntervencion = false;
  errorNotas = false;
  errorDepaCan = false;
  errorDetalleCan = false;

  constructor(private http: HttpClient, private citaUrgenteService: CitaUrgenteService,private loginService: LoginService) { }

  // Propiedades para los datos del formulario
  tipoIntervencion: number | null = null;
  notas: string = '';
  departamento: string = '';
  detalleCanalizacion: string = '';
  alumnoForaneo: boolean | null = null;
  datosCita: Array<any> = [];
  foraneo: boolean | null = null;

  ngOnInit(): void {
    console.log("neesita canalización:"+this.necesitaCanalizacion);
    this.necesitaCanalizacion = false;


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

    // Crear la cita
    const citaData = {
      fecha: this.datosCita[0],
      hora: this.datosCita[1],
      claveUnica: this.datosCita[2],
      estadoCita: this.datosCita[3],
      clavePsicologo: this.datosCita[4],
      clavePsicologoExterno: this.datosCita[5],
    };

    this.citaUrgenteService.crearCita(citaData).subscribe(
      (response: any) => {
        if(!this.tipoIntervencion) {
          //muestra error
          this.errorIntervencion = true;
          setTimeout(() => {
            this.errorIntervencion = false;
          }, 3000);
        }
        else{
          if(!this.notas) {
            //muestra error
            this.errorNotas = true;
            setTimeout(() => {
            this.errorNotas = false;
          }, 3000);
          }else{
            if(this.necesitaCanalizacion && !this.departamento && this.detalleCanalizacion) {
              //muestra error
              this.errorDepaCan = true;
              setTimeout(() => {
              this.errorDepaCan = false;
            }, 5000);
            }else{
              if(this.necesitaCanalizacion&& !this.detalleCanalizacion && this.departamento) {
                //muestra error
                this.errorDetalleCan = true;
                setTimeout(() => {
                this.errorDetalleCan = false;
              }, 5000);
                }else{
                  const idCita = response.idCita;
                  // Crear el objeto con los datos del formulario
                  const formData = {
                    tipoIntervencion: this.tipoIntervencion,
                    notas: this.notas,
                    departamento: this.necesitaCanalizacion ? this.departamento ? this.departamento: null : null,
                    detalleCanalizacion: this.necesitaCanalizacion ? this.detalleCanalizacion ? this.detalleCanalizacion : "": "", // Si necesita canalización, incluir los detalles
                    idCita: idCita,
                    foraneo: this.foraneo
                  };
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
                    this.visible = true;
                    //esperamos unos segundos
                    setTimeout(() => {
                      this.visible = false;
                    }, 3000);
                    console.log('Datos enviados correctamente:', response);
                    window.location.reload();
                  },
                  error => {
                    this.error = true;
                    //esperamos unos segundos
                    setTimeout(() => {
                      this.error = false;
                    }, 3000);
                    console.error('Error al enviar los datos:', error);
                  }
                );
              }
            }
          }
        }
      },
      (error: any) => {
        this.error = true;
              //esperamos unos segundos
              setTimeout(() => {
                this.errorCita = false;
              }, 5000);
        console.error('Error crear el registro de cita urgente:', error);
      }
    );
  }
  toggleCanalizacion(): void {
    console.log("antes togle:neesita canalización:"+this.necesitaCanalizacion);
    this.necesitaCanalizacion = !this.necesitaCanalizacion;
    console.log("despues togle:neesita canalización:"+this.necesitaCanalizacion);
  }
}
