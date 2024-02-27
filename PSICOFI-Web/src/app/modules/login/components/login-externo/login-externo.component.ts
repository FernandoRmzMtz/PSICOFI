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

  public validarContrasena: string = "";
  public validarCurp: string = "";

  constructor(private loginService: LoginService) {
  }
  public switchLogin(): void {
    this.loginService.toggleForm();
  }

  //Submit del formulario
  public onSubmit(): void {
    if(this.validaFormulario())
    {
      this.iniciarSesion();
    }
  }

  private iniciarSesion(): void {
    //Validacion.
    alert("a");
    if(this.curp == "RAPE011208HSPMDRA0" && this.contrasena == "123456"){
      alert("Sesion iniciada")
    }else{
      alert("Error al iniciar sesion");  
    }
  }

  //Validación simple de formato de entrada
  private validaFormulario(): boolean {
    if(this.contrasena.length < 8 || this.curp.length < 18)
    {
      this.validarContrasena = "is-invalid";
      this.validarCurp = "is-invalid";
      return true;
    }
    this.validarContrasena = "";
    this.validarCurp = "";
    return false;
  }


  //Se reestablece el invalid-input cuando se cambia
  public onInputChange(): void {
    if(this.validarContrasena != "")
    {
      this.validarContrasena = "";
      this.validarCurp = "";
    }
    
  }
}
