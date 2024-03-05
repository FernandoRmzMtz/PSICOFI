import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  //cambiar a un toast service en un futuro
  welcomeMessage: string | undefined;
  user: { name: string; role: string; };

  constructor() {
  this.welcomeMessage = 'Bienvenido al Dashboard';
  this.user = { name: '', role: '' }; }
  

  ngOnInit(): void {
    this.user = {
      name: 'Usuario Ejemplo',
      role: 'Administrador'
    };
  }

}
