import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-reporte-cita',
  templateUrl: './datos-reporte-cita.component.html',
  styleUrls: ['./datos-reporte-cita.component.css']
})
export class DatosReporteCitaComponent {

  public alumno = 
    {
    'claveUnica' : '324109',
    'nombres' : 'Fernando Antonio',
    'apellidoPaterno' : 'Ramírez',
    'apellidoMaterno' : 'Martínez',
    'edad' : 21,
    'sexo' : 'M',
    'area' : 'Ciencias de la computación',
    'carrera' : 'Ing. en sistemas inteligentes',
    'semestre' : 8,
    'condicionAcademica' : 'INSCRITO',
    'creditosAprobados' : 345,
    'creditosInscritos' : 48,
    'promedioGral' : 9.4,
    'asesor' : 'Dra. Sandra Edith Nava Muñoz',
    'contrasena' : '1234567890',
    'habilitado' : true,
    };

// fechaActual: Date = new Date();
// fechaFormateada: string = `${('0' + this.fechaActual.getDate()).slice(-2)}/${('0' + (this.fechaActual.getMonth() + 1)).slice(-2)}/${this.fechaActual.getFullYear()}`;
// horaFormateada: string = `${('0' + this.fechaActual.getHours()).slice(-2)}:${('0' + this.fechaActual.getMinutes()).slice(-2)}:${('0' + this.fechaActual.getSeconds()).slice(-2)}`;

public cita = {
    // 'fecha': this.fechaFormateada,
    // 'hora': this.horaFormateada,
    'fecha': '16/04/2024',
    'hora': '12:00',
    'claveUnica': 1,
    'estadoCita': 1,
    'clavePsicologo': 1,
    'clavePsicologoExterno': null,
};
}
