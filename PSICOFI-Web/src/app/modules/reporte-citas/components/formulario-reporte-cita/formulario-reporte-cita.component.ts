import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/enviroment';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCitasService } from '../../services/reporte-citas.service';
import { Cita } from 'src/app/components/servicios/citas.service';
import { NotaCita } from 'src/app/model/nota-cita.model';


@Component({
  selector: 'app-formulario-reporte-cita',
  templateUrl: './formulario-reporte-cita.component.html',
  styleUrls: ['./formulario-reporte-cita.component.css']
})
export class FormularioReporteCitaComponent implements OnInit {
  tiposIntervencion: any[] = [];
  departamentos: any[] = [];
  datosCitaLlenos: boolean = false;
  departamento: string = '';


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _router:Router, 
    private reporteCitaService:ReporteCitasService
  ) { }

    idCita = 0;
    public cita : Cita | null = null;
    public notaCita: NotaCita | null = null;


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
      }
    });  
  }

  getTipoDepartamentoName(idDepartamento: number | null | undefined): string {
    // const departamento = this.departamentos.find(depa => depa.idDepartamento === idDepartamento);
    // return departamento ? departamento.departamento : '';
    if (idDepartamento != null) {
      const departamento = this.departamentos.find(depa => depa.idDepartamento === idDepartamento);
      return departamento ? departamento.departamento : '';
  } else {
      // Manejar el caso en el que idDepartamento es null o undefined
      return 'Departamento desconocido';
  }
  }
  getTipoIntervencionName(idTipoIntervencion: number): string {
    const tipoIntervencion = this.tiposIntervencion.find(tipo => tipo.idTipoIntervencion === idTipoIntervencion);
    return tipoIntervencion ? tipoIntervencion.tipoIntervencion : '';
  }

  getNotaCita(idCita: number): void {
    this.reporteCitaService.getNotaCita(idCita).subscribe(
      response => {
        this.notaCita = response;
      },
      error => {
        console.error('Error al obtener la nota de la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }

  submitForm(): void {
    console.log('Formulario enviado');
  }
}
