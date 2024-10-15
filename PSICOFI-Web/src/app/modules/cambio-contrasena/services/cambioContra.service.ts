import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { LoginService } from "../../login/services/login.services";
import { environment } from "environments/enviroment";
import { CsrfServiceService } from "src/app/servicios/csrfService/csrf-service.service";



@Injectable({
  providedIn: 'root'
})

export class CambioContra {
    constructor(private http: HttpClient, private loginService: LoginService, private csrfService: CsrfServiceService){}

    public cambiarContrasena(curp: string, contrasena: string, nueva: string): Observable<any> 
    {
        const csrfToken = this.csrfService.getCsrf();

        return this.http.put(environment.api + '/psicologo/updatePassword', {
            "curp": curp,
            "contrasena": contrasena,
            "nuevaContrasena": nueva
        },
    {
        headers: {
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': this.loginService.getToken()?? "token"
            'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
    })
    }
}