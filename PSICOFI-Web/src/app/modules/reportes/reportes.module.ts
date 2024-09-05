import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesPage } from './reportes.page';
import { CarreraComponent } from './components/carrera/carrera.component';
import { AreaComponent } from './components/area/area.component';
import { FacultadComponent } from './components/facultad/facultad.component';
import { FormsModule } from '@angular/forms'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ReportesPage,
    CarreraComponent,
    AreaComponent,
    FacultadComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    BrowserModule,
    NgChartsModule ,
  ]
})
export class ReportesModule { }
