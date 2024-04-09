import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { GestionPsicologosModule } from './modules/gestion-psicologos/gestion-psicologos.module';
import { AgendarCitaModule } from './modules/agendar-cita/agendar-cita.module';
import { GestionAgendaModule } from './modules/gestion-agenda/gestion-agenda.module';
import { LoginPage } from './modules/login/login.page';
import { GestionPsicologosPage } from './modules/gestion-psicologos/gestion-psicologos.page';
import { DashboardComponent } from './modules/dashboard/dashboard.component'; 
import { AgendarCitaPage } from './modules/agendar-cita/agendar-cita.page';
import { PaginaInicioPage } from './modules/pagina-inicio/pagina-inicio.page';
import { CambioContrasenaPage } from './modules/cambio-contrasena/cambio-contrasena.page';
import { GestionAgendaPage } from './modules/gestion-agenda/gestion-agenda.page';
import { ReporteCitasPage } from './modules/reporte-citas/reporte-citas.page';

const routes: Routes = [
  {path: 'login', component: LoginPage},
  {path: 'gestion-psicologos', component: GestionPsicologosPage},
  {path: 'gestion-agenda', component: GestionAgendaPage},
  {path: 'inicio', component: PaginaInicioPage},
  {path: '', component: PaginaInicioPage},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'agendar-cita', component: AgendarCitaPage },
  {path: 'cambio-contrasena', component: CambioContrasenaPage},
  {path: 'reporte-citas', component: ReporteCitasPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
