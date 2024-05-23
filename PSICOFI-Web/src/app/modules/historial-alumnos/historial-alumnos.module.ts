import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialAlumnosPage } from './historial-alumnos.page';
import { TablaAlumnosComponent } from './components/tabla-alumnos/tabla-alumnos.component';
import { AlumnoAtendidoComponent } from './components/alumno-atendido/alumno-atendido.component';
import { TablaHistorialCitasComponent } from './components/tabla-historial-citas/tabla-historial-citas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistorialAlumnosPage,
    TablaAlumnosComponent,
    AlumnoAtendidoComponent,
    TablaHistorialCitasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class HistorialAlumnosModule { }
