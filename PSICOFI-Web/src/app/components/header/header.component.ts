import { Component } from '@angular/core';

interface HeaderRoute {
  title: string;
  path: string;
  tipoUsuario: string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  tipoUsuario: string = 'alumno'; 

  rutas: HeaderRoute[] = [
    { title: 'Inicio', path: '/dashboard', tipoUsuario: ['alumno', 'psicologo', 'psicologo_externo', 'administrador'] },
    { title: 'Agendar cita', path: '/agendar-cita', tipoUsuario: ['alumno'] },
    { title: 'Gestionar psicólogos', path: '/gestion-psicologos', tipoUsuario: ['psicologo', 'psicologo_externo'] },
    { title: 'Mis citas', path: '/mis-citas', tipoUsuario: ['alumno'] },
    { title: 'Gestión de agenda', path: '/gestion-agenda', tipoUsuario: ['psicologo', 'psicologo_externo'] },
    { title: 'Reporte de citas', path: '/reporte-citas', tipoUsuario: ['psicologo', 'psicologo_externo'] },
    { title: 'Cita urgente', path: '/cita-urgente', tipoUsuario: ['psicologo', 'psicologo_externo'] },
    { title: 'Alumnos atendidos', path: '/historial-alumnos', tipoUsuario: ['psicologo', 'psicologo_externo'] },
    { title: 'Cambiar contraseña', path: '/cambiar-contraseña', tipoUsuario: ['psicologo_externo'] },
    { title: 'Añadir psicólogo', path: '/añadir-psicologo', tipoUsuario: ['administrador'] },
    { title: 'Gestionar psicólogos', path: '/gestion-psicologos', tipoUsuario: ['administrador'] },
    { title: 'Reportes', path: '/reportes', tipoUsuario: ['administrador'] },
    { title: 'Cerrar sesión', path: '/cerrar-sesion', tipoUsuario: ['alumno', 'psicologo', 'psicologo_externo', 'administrador'] }
  ];
  

  get rutasFiltradas(): HeaderRoute[] {
    return this.rutas.filter(ruta => ruta.tipoUsuario.includes(this.tipoUsuario));
  }
}
