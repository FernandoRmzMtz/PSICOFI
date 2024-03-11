import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { GestionPsicologosModule } from './modules/gestion-psicologos/gestion-psicologos.module';
import { AgendarCitaModule } from './modules/agendar-cita/agendar-cita.module';
import { LoginPage } from './modules/login/login.page';
import { GestionPsicologosPage } from './modules/gestion-psicologos/gestion-psicologos.page';
import { DashboardComponent } from './modules/dashboard/dashboard.component'; 
import { AgendarCitaPage } from './modules/agendar-cita/agendar-cita.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agendar-cita', component: AgendarCitaPage },
  {path: 'gestion-psicologos', component: GestionPsicologosPage},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
