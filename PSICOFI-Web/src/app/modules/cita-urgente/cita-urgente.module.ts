import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaUrgentePage } from './cita-urgente.page';
import { DatosCitaUrgenteComponent } from './components/datos-cita-urgente/datos-cita-urgente.component';
import { FormularioCitaUrgenteComponent } from './components/formulario-cita-urgente/formulario-cita-urgente.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CitaUrgentePage,
    DatosCitaUrgenteComponent,
    FormularioCitaUrgenteComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class CitaUrgenteModule { }
