import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendarCitaComponent } from './agendar-cita.component';
import { AgendarCitaRoutes } from './agendar-cita.routing';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AgendarCitaRoutes),
        FormsModule,
        SharedModule
    ],
    declarations: [AgendarCitaComponent]
})

export class AgendarCitaModule {}
