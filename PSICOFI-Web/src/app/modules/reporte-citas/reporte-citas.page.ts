import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/enviroment';
import { ReporteCitasService } from './services/reporte-citas.service';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';

@Component({
  selector: 'app-reporte-citas',
  templateUrl: './reporte-citas.page.html',
  styleUrls: ['./reporte-citas.page.css']
})
export class ReporteCitasPage implements OnInit {
  idCita: number | null = null;
  notaCita: any;

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private reporteCitaService: ReporteCitasService,
    private _router: Router,
    private csrfService: CsrfServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCita = +params.get('idCita')!;
      if (this.idCita) {
        this.obtenerReporteCita(this.idCita);
      }
    });
  }

  obtenerReporteCita(idCita: number): void {
    this.http.get<any>(`${environment.api}/reporte-citas/${idCita}`).subscribe(
      response => {
        this.notaCita = response.notaCita;
      },
      error => {
        console.error('Error al obtener el reporte de la cita:', error);
        this._router.navigate(['/historial-alumnos']);
      }
    );
  }
}