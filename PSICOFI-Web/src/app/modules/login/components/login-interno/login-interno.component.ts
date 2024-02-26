import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';

@Component({
  selector: 'app-login-interno',
  templateUrl: './login-interno.component.html',
  styleUrls: ['./login-interno.component.css']
})
export class LoginInternoComponent {
  public cvunica: string = "";
  public contrasena: string = "";
  public validation: string = "";

  constructor(private loginService: LoginService) {
  }
  public  switchLogin() : void {
    this.loginService.toggleForm();
  }

  public onSubmit(): void {
    this.iniciarSesion();
  }

  private iniciarSesion(): void {
    //Validacion.
    alert("a");
    if(this.cvunica == "325850" && this.contrasena == "123456"){
      this.validation = "Sesion iniciada";
    }else{
      this.validation = "is-invalid";
  
    }
  }
}
