import { Routes } from '@angular/router';
import { CalendarioComponent } from './calendario.component';

export const EmpresasRoutes: Routes = [
	{
		path: '',
		children: [ {
			path: '',
			component: CalendarioComponent
		}]
	}
];
