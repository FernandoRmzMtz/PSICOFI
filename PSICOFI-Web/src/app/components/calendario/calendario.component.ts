import { Component, OnInit, ElementRef } from '@angular/core';
import { CitasService, Cita } from '../servicios/citas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.services';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  citas: Cita[] = [];
  form: FormGroup;
  tipoUsuario: string = '';
  private tipoUsuarioSubscription!: Subscription;

  horasDisponibles: string[] = this.generarHoras();


  constructor(
    private el: ElementRef,
    private citasService: CitasService,
    private LoginService: LoginService
  ) {
    this.form = new FormGroup({
      diasSeleccionados: new FormGroup(this.generarDiasControl()),
      horasSeleccionadas: new FormGroup(this.generarHorasControl()),
    });
  }

  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  mostrarModalDetalles = false;
  citaSeleccionada: Cita | null = null;
  hoy = new Date();
  fechaActual = new Date();
  diasDelMes: Date[] = [];
  diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  // tipoUsuario: 'alumno' | 'psicologo' = 'alumno';
  diaSeleccionado: Date = new Date();
  psicologoSeleccionadoId = 388721;
  disponibilidadPorDia: { [fecha: string]: { total: number, disponibles: number } } = {};
  horariosDelDiaSeleccionado: string[] = [];
  diaSeleccionadoElemento: HTMLElement | null = null;
  horaSeleccionada: string = "";
  citaAgendada: boolean = false;
  usuarioActualId: number = 324109; //cambiar referencias por el auth
  citasAgendadas: Cita[] = [];
  citasDisponibles: Cita[] = [];
  mostrarDetallesCita: number | null = null;
  mostrarModalCancelacion = false;
  mostrarModalAgregarHora = false;
  mostrarModalConfirmacion = false;
  diasParaSeleccionar = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];


  ngOnInit(): void {
    console.log('INIT');

    this.tipoUsuarioSubscription = this.LoginService.getTipoUsuarioObservable().subscribe(tipoUsuario => {
      this.tipoUsuario = tipoUsuario;
      console.log('Tipo de usuario:', this.tipoUsuario);
    });

    if (this.LoginService.isAuthenticated()) {
      this.tipoUsuario = this.LoginService.getTipoUsuario() || '';
    }
    
    console.log('TERMINO');

    this.generarDiasDelMes(this.fechaActual);
    this.cargarCitas();
  }

  ngOnDestroy(): void {
    if (this.tipoUsuarioSubscription) {
      this.tipoUsuarioSubscription.unsubscribe();
    }
  }
  generarHoras(): string[] {
    return Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);
  }

  generarDiasControl(): { [key: string]: FormControl } {
    let controls: { [key: string]: FormControl } = {};
    ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].forEach(dia => {
      controls[dia] = new FormControl(false);
    });
    return controls;
  }

  generarHorasControl(): { [key: string]: FormControl } {
    let controls: { [key: string]: FormControl } = {};
    this.horasDisponibles.forEach(hora => {
      controls[hora] = new FormControl(false);
    });
    return controls;
  }


  actualizarHorariosDelDiaSeleccionado(): void {
    if (this.citaAgendada) {
      this.horariosDelDiaSeleccionado = [];
    }
  }

  cargarCitas(): void {
    this.citasService.obtenerCitas(this.psicologoSeleccionadoId).subscribe({
      next: (citas) => {
        this.citas = citas;
        if(this.tipoUsuario==='alumno' && this.citas.some(cita => cita.claveUnica === this.usuarioActualId && cita.estado === 'Asistencia sin confirmar'))
          this.citaAgendada=true;
        if (this.tipoUsuario === 'alumno') {
          this.citas = this.citas.filter(cita => cita.estado === "Libre");
        }

        this.citas.forEach(cita => {
          if (cita.clavePsicologo === this.psicologoSeleccionadoId) {
            const fecha = cita.fecha;
            if (!this.disponibilidadPorDia[fecha]) {
              this.disponibilidadPorDia[fecha] = { total: 0, disponibles: 0 };
            }
            this.disponibilidadPorDia[fecha].total++;
            if (cita.estado === "Libre") {
              this.disponibilidadPorDia[fecha].disponibles++;
            }
          }
        });
        this.generarDiasDelMes(this.fechaActual);
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      },

    });
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
    if (this.citaAgendada) return;
    this.diaSeleccionado = dia;
    this.horaSeleccionada = "";
    const fechaSeleccionada = dia.toISOString().split('T')[0];
    this.horariosDelDiaSeleccionado = this.citas.filter(cita =>
      cita.fecha == fechaSeleccionada &&
      cita.estado === "Libre"
    ).map(cita => cita.hora);
    const citasDelDia = this.citas.filter(cita =>
      cita.hora.startsWith(fechaSeleccionada) &&
      cita.clavePsicologo === this.psicologoSeleccionadoId);
    this.citasAgendadas = citasDelDia.filter(cita => cita.estado === "Asistencia sin confirmar");
    this.citasDisponibles = citasDelDia.filter(cita => cita.estado === "Libre");
    if (this.diaSeleccionadoElemento) {
      this.diaSeleccionadoElemento.classList.remove('dia-seleccionado');
    }
    if (evento) {
      this.diaSeleccionadoElemento = (evento.target as HTMLElement);
      this.diaSeleccionadoElemento.classList.add('dia-seleccionado');
    }
  }

  abrirModalConfirmacion() {
    this.mostrarModalConfirmacion = true;
  }

  cerrarModalConfirmacion() {
    this.mostrarModalConfirmacion = false;
  }

  confirmarCita() {
    const cita = {
      id: '388721',
      claveUnica: 324109,
      fecha:  this.diaSeleccionado.toISOString().split('T')[0],  
      hora: this.horaSeleccionada  
    };
    this.citasService.agendarCita(cita).subscribe(
      resultado => {
        if (resultado === 1) {
          console.log('Cita agendada con éxito.');
        } else {
          console.error('Error al intentar agendar la cita.');
        }
      },
      error => {
        console.error('Error al agendar la cita:', error);
      }
    );
      this.cerrarModalConfirmacion();
  }
  
  agregarHoraDisponible(): void {
    const nuevaHora = `${this.horasDisponibles.length + 13}:00`;
    this.horasDisponibles.push(nuevaHora);
    console.log(`Nueva hora disponible agregada: ${nuevaHora}`);
  }


  confirmarCancelacion(): void {
    if (!this.citaSeleccionada) {
      console.error('No hay cita seleccionada para cancelar.');
      return;
    }

    console.log(`Cita cancelada: ${this.citaSeleccionada.idCita}`);
    this.cerrarModal();
    this.cargarCitas();
  }

  abrirModalAgregarHora(): void {
    this.mostrarModalAgregarHora = true;
  }

  abrirModalCancelacion(cita: Cita) {
    this.citaSeleccionada = cita;
    this.mostrarModalCancelacion = true;
  }

  cerrarModal() {
    this.mostrarModalCancelacion = false;
  }

  cerrarModalAgregarHora() {
    this.mostrarModalAgregarHora = false;
  }

  agregarHora() {
    console.log("Hora agregada");
    this.cerrarModalAgregarHora();
  }

  agregarHoras() {
    this.cerrarModalAgregarHora();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  abrirModalDetalles(cita: Cita) {
    this.citaSeleccionada = cita;
    this.mostrarModalDetalles = true;
  }

  cerrarModalDetalles() {
    this.mostrarModalDetalles = false;
    this.citaSeleccionada = null;
  }

  cancelarCita(cita: Cita) {
    this.cerrarModalDetalles();
  }
}
