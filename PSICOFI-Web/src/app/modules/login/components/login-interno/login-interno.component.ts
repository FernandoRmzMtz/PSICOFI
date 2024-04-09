import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-interno',
  templateUrl: './login-interno.component.html',
  styleUrls: ['./login-interno.component.css']
})
export class LoginInternoComponent {
  public cvunica: string = "";
  public contrasena: string = "";

  public validarContrasena: string = "";
  public validarClave: string = "";

  constructor(
    private loginService: LoginService,
    private _router: Router,) {}
  public  switchLogin() : void {
    this.loginService.toggleForm();
  }

  //Submit del formulario
  public onSubmit(): void {
    if(this.validaFormulario())
    {
      this.iniciarSesion();
    }
    else{
      alert("No se valido el formulario");
    }
  }

  private iniciarSesion(): void {
    //Validacion.
    if(this.cvunica == "325850" && this.contrasena == "123456"){
      this._router.navigate(['/dashboard']);
    }else{
      alert("Usuario o contrase&ntilde;a incorrecta");  
    }
  }

  //Validación simple de formato de entrada
  private validaFormulario(): boolean {
    if(this.contrasena.length < 8 || this.cvunica.length < 6)
    {
      this.validarContrasena = "is-invalid";
      this.validarClave = "is-invalid";
      return true;
    }
    this.validarContrasena = "";
    this.validarClave = "";
    return false;
  }


  //Se reestablece el invalid-input cuando se cambia
  public onInputChange(): void {
    if(this.validarContrasena != "")
    {
      this.validarContrasena = "";
      this.validarClave = "";
    }
    
  }
}
