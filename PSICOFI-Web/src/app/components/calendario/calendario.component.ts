import { Component, OnInit, ElementRef } from '@angular/core';
import { CitasService, Cita } from '../servicios/citas.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  citas: Cita[] = [];

  constructor(private el: ElementRef,
    private citasService: CitasService) {}

  hoy = new Date();
  fechaActual = new Date();
  diasDelMes: Date[] = [];
  diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  tipoUsuario: 'alumno' | 'psicologo' = 'alumno'; 
  diaSeleccionado: Date = new Date();
  horasDisponibles: string[] = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  psicologoSeleccionadoId = 1; 
  disponibilidadPorDia: { [fecha: string]: { total: number, disponibles: number } } = {};
  horariosDelDiaSeleccionado: string[] = [];
  diaSeleccionadoElemento: HTMLElement | null = null; 
  horaSeleccionada: string | null = null;
  citaAgendada: boolean = false;


  ngOnInit(): void {
    this.generarDiasDelMes(this.fechaActual);
    this.cargarCitas();
  }
  
  actualizarHorariosDelDiaSeleccionado(): void {
    if (this.citaAgendada) {
      // Aquí deberías recargar o actualizar la lista de citas disponibles para el día seleccionado.
      // Esto es solo un ejemplo, ajusta según tu lógica de negocio.
      this.horariosDelDiaSeleccionado = [];
    }
  }
  cargarCitas(): void {
    this.citas = this.citasService.obtenerCitas();
    
    this.citas.forEach(cita => {
      const fecha = cita.fechaHora.split('T')[0];
      if (!this.disponibilidadPorDia[fecha]) {
        this.disponibilidadPorDia[fecha] = { total: 0, disponibles: 0 };
      }
      this.disponibilidadPorDia[fecha].total++;
      if (cita.estadoCita === 'Disponible') {
        this.disponibilidadPorDia[fecha].disponibles++;
      }
    });
  
    this.generarDiasDelMes(this.fechaActual);
  }
  
  getDisponibilidadClase(dia: Date): string {
    const fecha = dia.toISOString().split('T')[0];
    const disponibilidad = this.disponibilidadPorDia[fecha];
  
    if (!disponibilidad) {
      return ''; 
    } else if (disponibilidad.disponibles > 3) {
      return 'color-box-green';
    } else if (disponibilidad.disponibles > 0) {
      return 'color-box-yellow';
    } else {
      return 'color-box-red'; 
    }
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
    const calendar = this.el.nativeElement.querySelector('.calendario');
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

  
  seleccionarDia(dia: Date, evento?: Event): void {
    if (this.citaAgendada) return; // Prevenir la selección de otro día si ya hay una cita agendada.
    this.diaSeleccionado = dia;
    this.horaSeleccionada = null;
  

    const fechaSeleccionada = dia.toISOString().split('T')[0];
    this.horariosDelDiaSeleccionado = this.citas.filter(cita => 
      cita.fechaHora.startsWith(fechaSeleccionada) && 
      cita.clavePsicologo === this.psicologoSeleccionadoId &&
      cita.estadoCita === 'Disponible'
    ).map(cita => cita.fechaHora.split('T')[1]);

    if (this.diaSeleccionadoElemento) {
      this.diaSeleccionadoElemento.classList.remove('dia-seleccionado');
    }

    if (evento) {
      this.diaSeleccionadoElemento = (evento.target as HTMLElement);
      this.diaSeleccionadoElemento.classList.add('dia-seleccionado');
    }
  }

  agendarCita(hora: string): void {
    if (!this.citaAgendada) {
      this.citaAgendada = true;
      console.log(`Cita agendada a las ${hora} en el día ${this.diaSeleccionado}`);
      // Aquí iría el resto de tu lógica para agendar la cita
      this.actualizarHorariosDelDiaSeleccionado();
    }
  }
  
  
  agregarHoraDisponible(): void {
    const nuevaHora = `${this.horasDisponibles.length + 13}:00`;
    this.horasDisponibles.push(nuevaHora);
    console.log(`Nueva hora disponible agregada: ${nuevaHora}`);
  }

  confirmarCita(): void {
    if (!this.horaSeleccionada) return;
  
    this.citaAgendada = true;
    console.log(`Cita confirmada a las ${this.horaSeleccionada} en el día ${this.diaSeleccionado}`);
    
    // Aquí deberías agregar la lógica para efectivamente confirmar la cita en tu backend o servicio
    this.actualizarHorariosDelDiaSeleccionado();
  }
  
}
