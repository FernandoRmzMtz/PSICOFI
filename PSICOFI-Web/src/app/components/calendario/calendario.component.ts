
import { Component, OnInit, ElementRef, Input, SimpleChanges } from '@angular/core';
import { CitasService, Cita } from '../servicios/citas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/modules/login/services/login.services';
import { AgendarCita } from 'src/app/modules/agendar-cita/services/agendar-cita.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CsrfServiceService } from 'src/app/servicios/csrfService/csrf-service.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() psicologoId: string = '0';

  citas: Cita[] = [];
  form: FormGroup;
  tipoUsuario: string = '';
  private tipoUsuarioSubscription!: Subscription;
  visible: boolean = false;
  horasDisponibles: string[] = this.generarHoras();
  success_msg:string= '';

  constructor(
    private el: ElementRef,
    private citasService: CitasService,
    private LoginService: LoginService,
    private agendarCitaService: AgendarCita,
    private http: HttpClient,
    private _router: Router,
    private csrfService: CsrfServiceService
  ) {
    this.form = new FormGroup({
      diasSeleccionados: new FormGroup(this.generarDiasControl()),
      horasSeleccionadas: new FormGroup(this.generarHorasControl()),
    });
  }

  fechaSeleccionada: Date = new Date();
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  mostrarModalDetalles = false;
  citaSeleccionada: Cita | null = null;
  hoy = new Date();
  fechaActual = new Date();
  diasDelMes: Date[] = [];
  diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  diaSeleccionado: Date = new Date();
  psicologo: string = '';
  disponibilidadPorDia: { [fecha: string]: { total: number, disponibles: number } } = {};
  horariosDelDiaSeleccionado: string[] = [];
  diaSeleccionadoElemento: HTMLElement | null = null;
  horaSeleccionada: string = "";
  citaAgendada: boolean = false;
  usuarioActualId: number | null = null;
  citasAgendadas: Cita[] = [];
  citasDisponibles: Cita[] = [];
  mostrarDetallesCita: number | null = null;
  mostrarModalCancelacion = false;
  mostrarModalAgregarHora = false;
  mostrarModalConfirmacion = false;
  diasParaSeleccionar = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];


  ngOnInit(): void {
    this.agendarCitaService.getCitaAgendada().subscribe((citaAgendada: boolean) => {
      this.citaAgendada = citaAgendada;
      if (this.citaAgendada) {
        this.cargarCitas();
      }
    });

    this.agendarCitaService.getCitaCancelada().subscribe(() => {
      this.cargarCitas();
    });

    this.tipoUsuarioSubscription = this.LoginService.getTipoUsuarioObservable().subscribe(tipoUsuario => {
      this.tipoUsuario = tipoUsuario;      
      if (this.LoginService.isAuthenticated()) {
        const claveUnica = this.LoginService.getClave();
        this.usuarioActualId = claveUnica ? parseInt(claveUnica, 10) : null;
      }
    });

    if (this.LoginService.isAuthenticated()) {
      const claveUnica = this.LoginService.getClave();
      this.usuarioActualId = claveUnica ? parseInt(claveUnica, 10) : null;
      this.tipoUsuario = this.LoginService.getTipoUsuario() || '';
      console.log("El tipo usuario es: "+this.tipoUsuario);

      //Reacomodo de codigo para primero verificar que esté autenticado el usuario
      this.generarDiasDelMes(this.fechaActual);
      this.cargarCitas();
      this.verificarCitaAgendada();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['psicologoId'] && !changes['psicologoId'].firstChange) {
      this.cargarCitas();
    }
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
  if (this.tipoUsuario === 'Alumno') {
    this.psicologo = this.psicologoId;
    this.cargarCitasAlumno();
  } else if ((this.tipoUsuario === 'Psicologo' || this.tipoUsuario === 'Psicologo externo') && this.usuarioActualId !== null) {
    if(this.tipoUsuario === 'Psicologo externo') {
      this.psicologo = this.LoginService.getClave();
      this.cargarCitasPsicologo();
    }else{
      this.psicologo = this.usuarioActualId.toString();
      this.cargarCitasPsicologo();
    }
  }
}

private cargarCitasAlumno(): void {
  this.citasService.obtenerCitas(this.psicologo).subscribe({
    next: (citas) => {
      if(!citas){
        console.log("No se encontraron citas");
      }
      this.citas = citas.filter(cita => cita.estado === "Libre");
      this.actualizarDisponibilidadPorDia();
      console.log("Se cargaron las citas del alumno");
    },
    error: (error) => {
      // console.error('Error al cargar citas:', error);
      console.log('El psicologo seleccionado no tiene citas disponibles');
    },
  });
}

private cargarCitasPsicologo(): void {
  console.log("cargarCitasPsicologo con psicologo:"+this.psicologo);
  console.log(this.psicologo);
  this.citasService.obtenerTodasLasCitas(this.psicologo).subscribe({
    next: (citas) => {
      this.citas = citas;
      this.actualizarDisponibilidadPorDia();
    },
    error: (error) => {
      console.error('Error al cargar citas del psicólogo:', error);
    },
  });
}

private actualizarDisponibilidadPorDia(): void {
  this.disponibilidadPorDia = {};
  //Validacion de que this.citas tiene citas
  if(this.citas){
    this.citas.forEach(cita => {
      const fecha = cita.fecha;
      if (!this.disponibilidadPorDia[fecha]) {
        this.disponibilidadPorDia[fecha] = { total: 0, disponibles: 0 };
      }
      this.disponibilidadPorDia[fecha].total++;
      if (cita.estado === "Libre") {
        this.disponibilidadPorDia[fecha].disponibles++;
      }
    });
    this.generarDiasDelMes(this.fechaActual);
  }else{
    console.log("El Psicologo no tiene horarios/citas habilitados.");
  }
}


  getDisponibilidadClase(dia: Date): string {
    const fecha = dia.toISOString().split('T')[0];
    const disponibilidad = this.disponibilidadPorDia[fecha];
    if (!disponibilidad || disponibilidad.disponibles === 0) {
      return '';
    } else if (disponibilidad.disponibles > 3) {
      return 'color-box-green';
    } else if (disponibilidad.disponibles > 1) {
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
  if (this.citaAgendada && this.tipoUsuario === 'Alumno') return;
  
  this.diaSeleccionado = dia;
  this.horaSeleccionada = "";
  const fechaSeleccionada = dia.toISOString().split('T')[0];

  //Validación de que this.citas contiene citas
  if(this.citas){
    this.horariosDelDiaSeleccionado = this.citas.filter(cita =>
      cita.fecha === fechaSeleccionada &&
      cita.estado === "Libre"
    ).map(cita => cita.hora);

    this.citasAgendadas = this.citas.filter(cita =>
      cita.fecha === fechaSeleccionada &&
    (cita.estado === "Asistencia confirmada" || cita.estado === "Asistencia sin confirmar")
    ).map(cita => cita);

    this.citasDisponibles =this.citas.filter(cita =>
      cita.fecha === fechaSeleccionada &&
      cita.estado === "Libre"
    ).map(cita => cita);
  }else{
    console.log("No se tienen registradas citas en el día seleccionado.");
  }

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
    if (this.usuarioActualId !== null) {
      const cita = {
        id: this.psicologoId,
        claveUnica: this.usuarioActualId, 
        fecha: this.diaSeleccionado.toISOString().split('T')[0],
        hora: this.horaSeleccionada
      };
      this.citasService.agendarCita(cita).subscribe(
        resultado => {
          if (resultado && resultado[0] === 'Cita agendada correctamente') {
            this.visible = true;
            this.success_msg = 'Cita agendada con éxito.'
            setTimeout(() => {
              this.visible = false;
            }, 3000);
            this.citaAgendada = true;
            this.agendarCitaService.emitirCitaAgendada();
          } else {
            console.log("Resultado:");
            console.log(resultado);
            console.log(resultado[0]);
          }
        },
        error => {
          console.error('Error al agendar la cita:', error);
        }
      );
    } else {
      console.error('El ID del usuario es null. No se puede agendar la cita.');
    }

    this.cerrarModalConfirmacion();
  }



  agregarHoraDisponible(): void {
    const nuevaHora = `${this.horasDisponibles.length + 13}:00`;
    this.horasDisponibles.push(nuevaHora);
  }


  confirmarCancelacion(): void {
    const csrfToken = this.csrfService.getCsrf();

    if (!this.citaSeleccionada) {
      console.error('No hay cita seleccionada para cancelar.');
      return;
    }
    const idCita = this.citaSeleccionada.idCita;

    console.log("el idCita seleccionado es: "+idCita);

    // Realizar la llamada para eliminar la cita de la base de datos
    this.http.delete(`http://localhost/PSICOFI-Api/public/cita/deleteDate/${idCita}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'X-CSRF-TOKEN': this.LoginService.getToken() ?? "token"
        'X-CSRF-TOKEN': csrfToken || ''
      },
      withCredentials:true
    }).subscribe(
      () => {
        console.log('El horario de la cita ha sido cancelada correctamente.');
        this.cerrarModal();
        this.cargarCitas();
        window.location.reload();
      },
      error => {
        console.error('Error al cancelar la cita:', error);
      }
    );

    // console.log(`Cita cancelada: ${this.citaSeleccionada.idCita}`);
    // this.cerrarModal();
    // this.cargarCitas();
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

  // agregarHoras() {

  //   this.cerrarModalAgregarHora();
  // }
  
  agregarHoras() {

    const csrfToken = this.csrfService.getCsrf();

    const diasSeleccionados = Object.keys(this.form.get('diasSeleccionados')?.value)
      .filter(dia => this.form.get('diasSeleccionados')?.value[dia]);
  
    const horasSeleccionadas = Object.keys(this.form.get('horasSeleccionadas')?.value)
      .filter(hora => this.form.get('horasSeleccionadas')?.value[hora]);

      
  
    // Generar una lista de fechas para los días seleccionados dentro de la semana de la fecha seleccionada
    const startOfWeek = this.getStartOfWeek(this.fechaSeleccionada);
    
    // Error corregido de agenda en sabados
    // const fechasSeleccionadas = diasSeleccionados.map(dia => {
    //   console.log("\nfechaSeleccionada:");
    //   const dayIndex = this.dias.indexOf(dia); console.log(dayIndex);
    //   const fecha = new Date(startOfWeek); console.log(fecha);
    //   fecha.setDate(startOfWeek.getDate() + dayIndex); console.log(fecha);
    //   console.log(fecha.toISOString().split('T')[0]);
    //   return fecha.toISOString().split('T')[0];
    // });

    const fechasSeleccionadas = diasSeleccionados.map(dia => {
      console.log("\nfechaSeleccionada:");
      const dayIndex = this.dias.indexOf(dia);
      console.log(dayIndex);
      
      const fecha = new Date(startOfWeek);
      console.log(fecha);
      
      fecha.setDate(startOfWeek.getDate() + dayIndex);
      console.log(fecha);
    
      // Aquí formateamos la fecha manualmente para evitar el cambio de zona horaria
      const year = fecha.getFullYear();
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato 2 dígitos
      const day = fecha.getDate().toString().padStart(2, '0'); // Día en formato 2 dígitos
    
      const fechaFormateada = `${year}-${month}-${day}`;
      console.log(fechaFormateada);
    
      return fechaFormateada;
    });
    //
  
    const id = this.LoginService.getClave();
    const token = this.LoginService.getToken() ?? "token";
    const numFechas = fechasSeleccionadas.length;
    let cont = 0;

    fechasSeleccionadas.forEach(fecha => {
      const data = {
        id,
        fecha,
        horas: horasSeleccionadas
      };
  
      this.http.post('http://localhost/PSICOFI-Api/public/cita/createDates', data, {
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': token
          'X-CSRF-TOKEN': csrfToken || ''
        },
        withCredentials:true
      }).subscribe(response => {
        console.log(`Respuesta del servidor para la fecha ${fecha}:`, response);
        cont++;
        if (cont === numFechas) {
          this.cerrarModalAgregarHora();
          window.location.reload();
        }
      }, error => {
        console.error(`Error al enviar los datos para la fecha ${fecha}:`, error);
        cont++;
        if (cont === numFechas) {
          this.cerrarModalAgregarHora();
          window.location.reload();
        }
      });
    });
  }
  

  onSubmit() {

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
    console.log("la cita es:");
    console.log(cita);
    if(cita.clavePsicologo){
        const citaData = {
        idCita: cita.idCita,
        id: cita.clavePsicologo.toString()
      }
      this.citasService.cancelarCita(citaData).subscribe(
        (response)=>{
          console.log(response);
          cita.estado = "Cancelada";
      },
      (error)=>{
        console.log(error);
      }
    );
    }else{
      if(cita.clavePsicologoExterno){
        console.log("mandando psic externo a cancelar");
          const citaData = {
          idCita: cita.idCita,
          id: cita.clavePsicologoExterno.toString()
        }
        console.log(cita.clavePsicologoExterno);
        this.citasService.cancelarCita(citaData);
      }
    }
    this.cerrarModalDetalles();
  }

  verificarCitaAgendada(): void {
    if (this.tipoUsuario === 'Alumno') {
      if (this.usuarioActualId !== null) { 
        const idAlumno = this.usuarioActualId;
        this.agendarCitaService.obtenerCitasProceso(idAlumno).subscribe((data: any) => {
          if (Array.isArray(data) && data[0] === 'Sin cita agendada') {
            this.agendarCitaService.setCitaAgendada(false);
          } else if (data) {
            this.agendarCitaService.setCitaAgendada(true);
          }
        },
          (error) => {
            console.error('Error al verificar las citas en proceso:', error);
          });
      } else {
        console.error('El ID del usuario es null. No se puede verificar las citas en proceso.');
      }
    }
  }


  getSemanaSeleccionada(): string {
    const startOfWeek = this.getStartOfWeek(this.fechaSeleccionada);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    return `${startOfWeek.toLocaleDateString('es-ES', options)} - ${endOfWeek.toLocaleDateString('es-ES', options)}`;
  }

  getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return startOfWeek;
  }

  semanaAnterior(): void {
    //Validación para no regresar a una semana anterior a la actual
    const hoy = new Date();
    // console.log("hoy:"+hoy);
    const actualWeek = this.getStartOfWeek(hoy);
    const selectedWeek = this.getStartOfWeek(this.fechaSeleccionada);
    if((actualWeek.getDate() == selectedWeek.getDate()) &&
       (actualWeek.getMonth() == selectedWeek.getMonth()) && 
       (actualWeek.getFullYear() == selectedWeek.getFullYear())){
        console.log("No puedes regresar a una semana anterior a la actual.");
    }else{
      this.fechaSeleccionada.setDate(this.fechaSeleccionada.getDate() - 7);
    }
    // console.log("Fecha del inicio de semana actual");
    // console.log(actualWeek.getDate()+"/"+actualWeek.getMonth()+"/"+actualWeek.getFullYear());
    // console.log("Fecha del inicio de semana seleccionada");
    // console.log(selectedWeek.getDate()+"/"+selectedWeek.getMonth()+"/"+selectedWeek.getFullYear());

  }

  semanaSiguiente(): void {
    this.fechaSeleccionada.setDate(this.fechaSeleccionada.getDate() + 7);
  }

}

