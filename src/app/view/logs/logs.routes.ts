import { Routes } from '@angular/router';
import { RoleGuard } from '../../core/services/role.guard';

export const routes: Routes = [
  {
    path: 'logs',
    loadComponent: () =>
      import('./logs.component').then(
        (m) => m.LogsComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin'] }   
  },
  {
    path: '',
    redirectTo: 'logs',
    pathMatch: 'full',
  },
];