import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  claveUnica: string = '12345'; // Ejemplo de clave única
  nombre: string = 'Juan Pérez'; // Ejemplo de nombre
  psicologos: string[] = ['Psicólogo 1', 'Psicólogo 2', 'Psicólogo 3']; // Lista de psicólogos

}
