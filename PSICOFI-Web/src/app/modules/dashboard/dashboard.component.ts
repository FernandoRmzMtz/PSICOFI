import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //cambiar a un toast service en un futuro
  welcomeMessage: string | undefined;
  user: { name: string; role: string; };

    constructor(private loginService: LoginService) {
    this.welcomeMessage = 'Bienvenido al Dashboard';
    this.user = { name: '', role: '' };
  }
    

  ngOnInit(): void {
    this.user = {
      name: this.loginService.getActiveUser() || 'Usuario no encontrado',
      role: "rol"
    };
  }

}
