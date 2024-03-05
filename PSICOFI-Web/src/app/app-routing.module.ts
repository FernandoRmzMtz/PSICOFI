import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { LoginPage } from './modules/login/login.page';
import { DashboardComponent } from './dashboard/dashboard.component'; // Asegúrate de que la ruta sea correcta
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';


const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
