import { Component } from '@angular/core';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';
import { CitaUrgenteService } from './services/cita-urgente.service';

@Component({
  selector: 'app-cita-urgente',
  templateUrl: './cita-urgente.page.html',
  styleUrls: ['./cita-urgente.page.css']
})
export class CitaUrgentePage {
  csrfToken: string = "";
  constructor(
    private csrfTokenService: CsrfServiceService, 
    private citaUrgenteService: CitaUrgenteService,
  ) {
    this.getCsrfToken();
  }

  getCsrfToken() {
    this.csrfTokenService.getCsrfToken().subscribe(data => {
      this.csrfToken = data.csrf_token;
    });
  }

  onSubmit(data: any) {
    const headers = { 'X-CSRF-TOKEN': this.csrfToken };
    this.citaUrgenteService.setNotaCita(data,headers).subscribe(response => {
      console.log('Respuesta del servidor:', response);
    }, error => {
      console.error('Error en la solicitud:', error);
    });
  }
}
