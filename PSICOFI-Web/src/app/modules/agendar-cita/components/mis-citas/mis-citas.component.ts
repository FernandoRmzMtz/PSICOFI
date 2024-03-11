import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  claveUnica: string = '12345';
  nombre: string = 'Juan Pérez';
  tieneCita: boolean = true; 
  citasProceso: any[] = [
    { fecha: '10/03/2024', hora: '10:00', psicologo: 'Psicólogo 1' }
  ];
  historialCitas: any[] = [
    { fecha: '01/03/2024', hora: '10:00', psicologo: 'Psicólogo 1', estado: 'Realizada' },
    { fecha: '05/02/2024', hora: '11:00', psicologo: 'Psicólogo 2', estado: 'Cancelada' }
  ];
  

  constructor() { }

  ngOnInit(): void {
  }
  cancelarCita(){
    this.tieneCita = false;
  }
}
