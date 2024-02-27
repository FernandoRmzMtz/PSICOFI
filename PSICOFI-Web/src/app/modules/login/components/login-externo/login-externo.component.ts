import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';
@Component({
  selector: 'app-login-externo',
  templateUrl: './login-externo.component.html',
  styleUrls: ['./login-externo.component.css']
})
export class LoginExternoComponent {
  curp: string = "";
  contrasena: string = "";
  validation: string = "";
  constructor(private loginService: LoginService) {
  }
  public switchLogin(): void {
    this.loginService.toggleForm();
  }

  public onSubmit(): void {
    this.iniciarSesion();
  }

  private iniciarSesion(): void {
    //Validacion.
    alert("a");
    if(this.curp == "RAPE011208HSPMDRA0" && this.contrasena == "123456"){
      this.validation = "Sesion iniciada";
    }else{
      this.validation = "is-invalid";
  
    }
  }
}
