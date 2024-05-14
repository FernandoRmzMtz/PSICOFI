import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesPage } from './reportes.page';
import { CarreraComponent } from './components/carrera/carrera.component';
import { AreaComponent } from './components/area/area.component';
import { FacultadComponent } from './components/facultad/facultad.component';



@NgModule({
  declarations: [
    ReportesPage,
    CarreraComponent,
    AreaComponent,
    FacultadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportesModule { }
