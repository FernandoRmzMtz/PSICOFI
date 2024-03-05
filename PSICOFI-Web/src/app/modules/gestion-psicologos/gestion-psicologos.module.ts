import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPsicologosPage } from './gestion-psicologos.page';
import { GestionPsicoComponent } from './components/gestion-psico/gestion-psico.component';
import { AnadirPsicoComponent } from './components/anadir-psico/anadir-psico.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionPsicologosPage,
    GestionPsicoComponent,
    AnadirPsicoComponent
  ],
  imports: [
    CommonModule,
    [FormsModule]
  ]
})
export class GestionPsicologosModule { }
