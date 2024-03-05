import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../components/calendario/calendario.component';

@NgModule({
  declarations: [
    CalendarioComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarioComponent,
  ]
})
export class SharedModule {}
