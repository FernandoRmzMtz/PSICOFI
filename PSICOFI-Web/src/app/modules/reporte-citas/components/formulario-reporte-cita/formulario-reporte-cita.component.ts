import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/enviroment';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';
import { NotaCita } from 'src/app/model/nota-cita.model';
import { LoginService } from 'src/app/modules/login/services/login.services';


@Component({
  selector: 'app-formulario-reporte-cita',
  templateUrl: './formulario-reporte-cita.component.html',
  styleUrls: ['./formulario-reporte-cita.component.css']
})
export class FormularioReporteCitaComponent implements OnInit {
  tiposIntervencion: any[] = [];
  departamentos: any[] = [];
  datosCitaLlenos: boolean = false;

  necesitaCanalizacion: boolean = false;
  tipoIntervencion: number | null = null;
  notas: string = '';
  departamento: number | null = null;
  detalleCanalizacion: string = '';
  foraneo: boolean | undefined | null = null;
  // foraneo: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _router:Router, 
    private reporteCitaService:ReporteCitasService,
    private loginService:LoginService
  ) { }

    idCita = 0;
    public cita : Cita | null = null;
    public notaCita: NotaCita | null = null;
    visible = false;


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
        console.error('Error al obtener tipos de intervención:', error);
      }
    );

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
    });  
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
          // this.departamento = this.departamentos[this.notaCita.departamento].idDepartamento;
          this.departamento = this.notaCita.departamento;
          console.log("el departamento es: "+this.departamento+" y el tipo intervencion es:"+this.tipoIntervencion);
        }
      },
      error => {
        console.error('Error al obtener la nota de la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }

  submitForm(): void {
        // Crear el objeto con los datos del formulario

        // console.log("El departamento es:"+this.departamento);

        const formData = {
          tipoIntervencion: this.tipoIntervencion,
          notas: this.notas,
          departamento: this.departamento ? this.departamento: null,
          // departamento: this.departamento ? this.departamentos[parseInt(this.departamento)].idDepartamento: null,
          detalleCanalizacion: this.detalleCanalizacion ? this.detalleCanalizacion : "",
          idCita: this.idCita,
          foraneo: this.foraneo
        };

        console.log(formData);

        // Enviar los datos al servidor
        this.http.put<any>(environment.api+'/api/nota-cita/'+this.idCita, 
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
            console.error('Error al enviar los datos:', error);
          }
        );
      }  
}
