import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesPage } from './reportes.page';
import { CarreraComponent } from './components/carrera/carrera.component';
import { AreaComponent } from './components/area/area.component';
import { FacultadComponent } from './components/facultad/facultad.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { FormsModule } from '@angular/forms'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ReportesPage,
    CarreraComponent,
    AreaComponent,
    FacultadComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule  
  ]
})
export class ReportesModule { }
