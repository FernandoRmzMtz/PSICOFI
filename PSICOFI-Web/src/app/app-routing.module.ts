import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.module';
import { LoginPage } from './modules/login/login.page';
import { GestionPsicologosPage } from './modules/gestion-psicologos/gestion-psicologos.page';

const routes: Routes = [
  {path: 'login', component: LoginPage},
  {path: 'gestion-psicologos', component: GestionPsicologosPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
