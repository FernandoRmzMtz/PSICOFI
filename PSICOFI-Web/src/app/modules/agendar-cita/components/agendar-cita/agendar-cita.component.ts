import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  claveUnica: string = '324109'; 
  nombre: string = 'Fernando Antonio Ramírez Martínez'; 
  psicologos: string[] = ['Lane Kshlerin Rippin Von', 'Charlene Torp DDS Crona McLaughlin', 'Carlee Gerhold Kozey Fadel']; 

}
