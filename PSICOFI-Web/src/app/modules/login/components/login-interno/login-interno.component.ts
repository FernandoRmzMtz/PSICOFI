import { Component } from '@angular/core';
import { LoginService } from '../../services/login.services';

@Component({
  selector: 'app-login-interno',
  templateUrl: './login-interno.component.html',
  styleUrls: ['./login-interno.component.css']
})
export class LoginInternoComponent {
  constructor(private loginService: LoginService) {
  }
  public  switchLogin() : void {
    this.loginService.toggleForm();
  }
}
