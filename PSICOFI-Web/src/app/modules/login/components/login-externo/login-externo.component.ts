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
  public errorMessage: string = "";

  public isLoading = false;

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
      this.errorMessage = "Usuario o contraseña incorrecta";    }
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
    this.errorMessage = ""; 
  }

  public validaUsuarioInterno(): void {
    this.isLoading = true;
    this.loginService.loginInterno(this.cvunica, this.contrasena).subscribe((data) => {
      if (data) {
        if (data.validacion == "USUARIO-INVALIDO") {
          this.errorMessage = "Usuario o contraseña incorrecta";
          this.isLoading = false;
        }
        else {
          this.loginService.setToken(data.token);
          this.loginService.setActiveUser(data.nombre);
          this.loginService.setClave(data.id);
          this.loginService.setTipoUsuario(data.rol);
          this._router.navigate(['/inicio']);
          this.isLoading = false;
          this.loginService.restartTimeout();
        }

      } else {
        this.errorMessage = "Usuario o contraseña incorrecta";
        this.isLoading = false;
      }
    });
  }
}
