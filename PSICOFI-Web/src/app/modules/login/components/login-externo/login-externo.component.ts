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
  constructor(private loginService: LoginService) {
  }
  public switchLogin(): void {
    this.loginService.toggleForm();
  }

  public onSubmit(): void {
    
  }
}
