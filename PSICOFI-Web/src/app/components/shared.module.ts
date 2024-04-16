import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarioComponent
  ],
  imports: [CommonModule,
    ReactiveFormsModule],
  exports: [CalendarioComponent]
})
export class SharedModule { }
