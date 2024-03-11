import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  constructor(private el: ElementRef) {}

  hoy = new Date();
  fechaActual = new Date();

  diasDelMes: Date[] = [];
  diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  tipoUsuario: 'alumno' | 'psicologo' = 'alumno'; 
  diaSeleccionado: Date = new Date();
  horasDisponibles: string[] = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  ngOnInit(): void {
    this.generarDiasDelMes(this.fechaActual);
  }

  generarDiasDelMes(fecha: Date) {
    this.diasDelMes = [];
    const year = fecha.getFullYear();
    const month = fecha.getMonth();

    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    
    for (let i = primerDia.getDay(); i > 0; i--) {
      this.diasDelMes.push(new Date(year, month, -i + 1));
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      this.diasDelMes.push(new Date(year, month, dia));
    }

    const diasParaCompletar = 7 - ultimoDia.getDay() - 1;
    for (let i = 1; i <= diasParaCompletar; i++) {
      this.diasDelMes.push(new Date(year, month + 1, i));
    }
  }

  private aplicarAnimacion(clase: string) {
    const calendar = this.el.nativeElement.querySelector('.calendar');
    calendar.classList.add(clase);
    setTimeout(() => calendar.classList.remove(clase), 500); 
  }

  mesAnterior() {
    if (!this.esMesActual()) {
      this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() - 1, 1);
      this.generarDiasDelMes(this.fechaActual);
      this.aplicarAnimacion('animate-prev');
    }
  }

  mesSiguiente() {
    this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() + 1, 1);
    this.generarDiasDelMes(this.fechaActual);
    this.aplicarAnimacion('animate-next');
  }

  esMesActual(): boolean {
    const hoy = new Date();
    return this.fechaActual.getMonth() === hoy.getMonth() && this.fechaActual.getFullYear() === hoy.getFullYear();
  }

  seleccionarDia(dia: Date): void {
    this.diaSeleccionado = dia;
  }
  agendarCita(hora: string): void {
    console.log(`Cita agendada a las ${hora} en el día ${this.diaSeleccionado}`);
  }
  
  agregarHoraDisponible(): void {
    const nuevaHora = `${this.horasDisponibles.length + 13}:00`;
    this.horasDisponibles.push(nuevaHora);
    console.log(`Nueva hora disponible agregada: ${nuevaHora}`);
  }
}
