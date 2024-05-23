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
    private _router: Router,) { }
  public switchLogin(): void {
    this.loginService.toggleForm();
  }

  //Submit del formulario
  public onSubmit(): void {
    this.iniciarSesion();
  }

  private iniciarSesion(): void {
    if (this.cvunica.length == 6) {
      this.validaUsuarioInterno();
    }
    else {
      alert("Usuario o contraseña incorrecta");
    }
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
        console.log("data");
        console.log(data);
        if (data.validacion == "USUARIO-INVALIDO") {
          alert("Usuario o contraseña incorrecta");
        }
        else {
          this.loginService.setToken(data.token);
          this.loginService.setActiveUser(data.nombre);
          this.loginService.setClave(data.id);
          this.loginService.setTipoUsuario(data.rol);
          this._router.navigate(['/inicio']);
        }

      } else {
        alert("Usuario o contraseña incorrecta");
      }
    });
  }
}
