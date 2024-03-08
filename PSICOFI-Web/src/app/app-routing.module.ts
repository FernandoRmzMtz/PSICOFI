import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { GestionPsicologosModule } from './modules/gestion-psicologos/gestion-psicologos.module';
import { LoginPage } from './modules/login/login.page';
import { GestionPsicologosPage } from './modules/gestion-psicologos/gestion-psicologos.page';
import { PaginaInicioPage } from './modules/pagina-inicio/pagina-inicio.page';

const routes: Routes = [
  {path: 'login', component: LoginPage},
  {path: 'gestion-psicologos', component: GestionPsicologosPage},
  {path: 'inicio', component: PaginaInicioPage},
  {path: '', component: PaginaInicioPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
