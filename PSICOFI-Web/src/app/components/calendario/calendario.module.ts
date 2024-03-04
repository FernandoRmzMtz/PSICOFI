import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IgxCalendarModule, IgxDialogModule } from 'igniteui-angular';
import { CalendarioComponent } from './calendario.component'; 

@NgModule({
  declarations: [
    CalendarioComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    IgxCalendarModule,
    IgxDialogModule
  ],
  exports: [
    CalendarioComponent 
  ]
})
export class CalendarioModule { }
