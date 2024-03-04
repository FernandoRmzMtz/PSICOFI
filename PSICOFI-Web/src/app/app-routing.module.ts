import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { LoginPage } from './modules/login/login.page';
import { DashboardComponent } from './dashboard/dashboard.component'; // Asegúrate de que la ruta sea correcta


const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
