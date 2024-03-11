import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    }, 
    {   path: 'dashboard', 
        component: DashboardComponent }
];
