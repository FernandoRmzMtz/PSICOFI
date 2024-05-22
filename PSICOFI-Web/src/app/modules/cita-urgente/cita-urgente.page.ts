import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';
import { environment } from 'environments/enviroment';

@Component({
  selector: 'app-cita-urgente',
  templateUrl: './cita-urgente.page.html',
  styleUrls: ['./cita-urgente.page.css']
})
export class CitaUrgentePage {
  csrfToken: string = "";

  
  constructor(private csrfTokenService: CsrfServiceService, private http: HttpClient) {
    this.getCsrfToken();
  }

  getCsrfToken() {
    this.csrfTokenService.getCsrfToken().subscribe(data => {
      this.csrfToken = data.csrf_token;
    });
  }

  onSubmit(data: any) {
    const headers = { 'X-CSRF-TOKEN': this.csrfToken };
    this.http.post(environment.api+'/nota-cita', data, { headers }).subscribe(response => {
      console.log('Respuesta del servidor:', response);
    }, error => {
      console.error('Error en la solicitud:', error);
    });
  }
}
