import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/enviroment';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';
import { NotaCita } from 'src/app/model/nota-cita.model';
import { LoginService } from 'src/app/modules/login/services/login.services';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';


@Component({
  selector: 'app-formulario-reporte-cita',
  templateUrl: './formulario-reporte-cita.component.html',
  styleUrls: ['./formulario-reporte-cita.component.css']
})
export class FormularioReporteCitaComponent implements OnInit {
  tiposIntervencion: any[] = [];
  departamentos: any[] = [];
  datosCitaLlenos: boolean = false;
  public isLoading = false;
  necesitaCanalizacion: boolean = false;
  tipoIntervencion: number | null = null;
  notas: string = '';
  departamento: number | null = null;
  detalleCanalizacion: string = '';
  foraneo: boolean | undefined | null = null;
  atendida: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _router:Router, 
    private reporteCitaService:ReporteCitasService,
    private loginService:LoginService,
    private csrfService: CsrfServiceService
  ) { }

    idCita = 0;
    public cita : Cita | null = null;
    public notaCita: NotaCita | null = null;
    visible = false;
    error =  false;
    errorIntervencion = false;
    errorNotas = false;
    errorDepaCan = false;
    errorDetalleCan = false;


  ngOnInit(): void {
    this.isLoading = true;
    this.http.get<any[]>(environment.api+'/tipos-intervencion').subscribe(
      response => {
        this.tiposIntervencion = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
        this.isLoading = false;
      }
    );
    this.isLoading = true;
    this.http.get<any[]>(environment.api+'/departamentos').subscribe(
      response => {
        this.departamentos = response;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener tipos de intervención:', error);
        this.isLoading = false;
      }
    );

    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.idCita = +params.get('idCita')!;
      console.log("id de cita:"+this.idCita);
      if (this.idCita) {
        this.getNotaCita(this.idCita);
        //Validar que solo pueda ver/editar el psicologo que dio la cita
        // const clavePsico = this.loginService.getClave();
        // if(clavePsico!= this.cita?.clavePsicologo.toString()) {
        //   this._router.navigate(['/historial-alumnos']);
        // }
      }
      this.isLoading = false;
    });  
  }

  toggleCanalizacion(): void {
    console.log("antes togle:neesita canalización:"+this.necesitaCanalizacion);
    this.necesitaCanalizacion = !this.necesitaCanalizacion;
    console.log("despues togle:neesita canalización:"+this.necesitaCanalizacion);
  }

  getTipoDepartamentoName(idDepartamento: number | null | undefined): string {
    if (idDepartamento != null) {
      const departamento = this.departamentos.find(depa => depa.idDepartamento === idDepartamento);
      return departamento ? departamento.departamento : '';
    } else {
        return '';
    }
  }
  getTipoIntervencionName(idTipoIntervencion: number): string {
    if (idTipoIntervencion != null) {
      const tipoIntervencion = this.tiposIntervencion.find(tipo => tipo.idTipoIntervencion === idTipoIntervencion);
      return tipoIntervencion ? tipoIntervencion.tipoIntervencion : '';
    } else {
        return '';
    }
  }

  getNotaCita(idCita: number): void {
    this.isLoading = true;
    this.reporteCitaService.getNotaCita(idCita).subscribe(
      response => {
        this.notaCita = response;
        console.log("esta es la notaCitao¿Obtenida: ");
        console.log(this.notaCita);
        this.tipoIntervencion = this.notaCita.tipoIntervencion;
        this.foraneo = this.notaCita.foraneo;
        this.notas = this.notaCita.notas;
        if(this.notaCita.detalleCanalizacion){
          this.necesitaCanalizacion = true;
          this.detalleCanalizacion = this.notaCita.detalleCanalizacion;
        }
        if(this.notaCita.departamento){
          this.departamento = this.notaCita.departamento;
          console.log("el departamento es: "+this.departamento+" y el tipo intervencion es:"+this.tipoIntervencion);
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener la nota de la cita:', error);
        this.isLoading = false;
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }

  submitForm(): void {
    if(!this.tipoIntervencion) {
      //muestra error
      this.errorIntervencion = true;
      setTimeout(() => {
        this.errorIntervencion = false;
      }, 3000);
    }
    else{
      // if(!this.notas) {
      //   //muestra error
      //   this.errorNotas = true;
      // setTimeout(() => {
      //   this.errorNotas = false;
      // }, 3000);
      // }else{
        // if(this.necesitaCanalizacion && !this.departamento && this.detalleCanalizacion) {
        if(this.necesitaCanalizacion && !this.departamento) {
          //muestra error
          this.errorDepaCan = true;
        setTimeout(() => {
          this.errorDepaCan = false;
        }, 5000);
        }else{
          // if(this.necesitaCanalizacion && this.departamento) {
          //   //muestra error
          //   this.errorDetalleCan = true;
          // setTimeout(() => {
          //   this.errorDetalleCan = false;
          // }, 5000);
          //   }else{
            const formData = {
              tipoIntervencion: this.tipoIntervencion,
              // notas: this.notas,
              departamento: this.necesitaCanalizacion? this.departamento ? this.departamento: null : null,
              // detalleCanalizacion: this.necesitaCanalizacion? this.detalleCanalizacion ? this.detalleCanalizacion : "" :"",
              idCita: this.idCita,
              foraneo: this.foraneo
            };
            // Cambiar estatus de cita
            this.updateStatusCita();
            // Enviar los datos al servidor
            const csrfToken = this.csrfService.getCsrf();

            this.http.put<any>(environment.api+'/api/nota-cita/'+this.idCita, 
            formData,
            {
              headers: {
                'Content-Type': 'application/json',
                // 'X-CSRF-TOKEN': this.loginService.getToken() ?? "token"
                'X-CSRF-TOKEN': csrfToken || ''
              },
              withCredentials:true
            },
            ).subscribe(
              response => {
                this.visible = true;
                setTimeout(() => {
                  this.visible = false;
                }, 3000);
                console.log('Datos enviados correctamente:', response);
                window.location.reload();
              },
              error => {
                this.error = true;
                setTimeout(() => {
                  this.error = false;
                }, 3000);
                console.error('Error al actualizar la nota de la cita:', error);
              }
            );
          } 
        // } 
      // }
    }
  }

  updateStatusCita(): void {
    const status = this.atendida ? 4 : 5; //4: atendida, 5: no atendida
    
    // Prepara los datos para actualizar el estatus de la cita
    const statusData = {
      idCita: this.idCita,
      estadoCita: status
    };
  
    // Obtiene el token CSRF
    const csrfToken = this.csrfService.getCsrf();
  
    // Enviar los datos al servidor para actualizar el estatus de la cita
    this.http.put<any>(`${environment.api}/actualizar-estado-cita/${this.idCita}`, 
      statusData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials: true
      }
    ).subscribe(
      response => {
        console.log('Estatus de cita actualizado correctamente:', response);
        // Puedes recargar la página o manejar alguna acción adicional
        // window.location.reload();
      },
      error => {
        console.error('Error al actualizar el estatus de la cita:', error);
      }
    );
  }
  
}
