import { Routes } from '@angular/router';

import { AgendarCitaComponent } from './agendar-cita.component';

export const AgendarCitaRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'agendar-cita',
        component: AgendarCitaComponent
    }]
}
];
