import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  diasAbreviados: string[] = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  fechaActual: Date = new Date();
  diasDelMes: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generarCalendario(this.fechaActual);
  }

  generarCalendario(fecha: Date): void {
    const inicioMes: Date = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const finalMes: Date = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    const dias: number[] = [];

    for (let dia = inicioMes.getDay(); dia > 0; dia--) {
      dias.unshift(new Date(fecha.getFullYear(), fecha.getMonth(), -dia + 1).getDate());
    }

    for (let dia = 1; dia <= finalMes.getDate(); dia++) {
      dias.push(dia);
    }

    this.diasDelMes = dias;
  }

  cambiarMes(direccion: number): void {
    this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() + direccion, 1);
    this.generarCalendario(this.fechaActual);
  }

}
