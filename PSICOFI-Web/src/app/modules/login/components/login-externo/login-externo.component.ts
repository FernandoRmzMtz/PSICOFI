import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-externo',
  templateUrl: './login-externo.component.html',
  styleUrls: ['./login-externo.component.css']
})
export class LoginExternoComponent {
  public cvunica: string = "";
  public contrasena: string = "";

  public validarContrasena: string = "";
  public validarClave: string = "";

  constructor(
    private loginService: LoginService,
    private _router: Router,) { }
  public switchLogin(): void {
    this.loginService.toggleForm();
  }

  //Submit del formulario
  public onSubmit(): void {
    this.iniciarSesion();
  }

  private iniciarSesion(): void {
    if (this.cvunica.length == 18) {
      this.validaUsuarioInterno();
    }
    else {
      alert("Usuario o contraseña incorrecta");
    }
  }

  //Validación simple de formato de entrada
  private validaFormulario(): boolean {
    if (this.contrasena.length < 8 || this.cvunica.length < 6) {
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
    if (this.validarContrasena != "") {
      this.validarContrasena = "";
      this.validarClave = "";
    }
  }

  public validaUsuarioInterno(): void {
    this.loginService.loginInterno(this.cvunica, this.contrasena).subscribe((data) => {
      if (data) {
        if (data.validacion == "USUARIO-INVALIDO") {
          alert("Usuario o contraseña incorrecta");
        }
        else {
          this.loginService.setToken(data.token);
          this.loginService.setActiveUser(data.nombre_alumno);
          this.loginService.setClave(data.clave_unica);
          this._router.navigate(['/dashboard']);
        }

      } else {
        alert("Usuario o contraseña incorrecta");
      }
    });
  }
}
