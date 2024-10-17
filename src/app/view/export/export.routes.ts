import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lpo',
    loadComponent: () =>
      import('./lpo/lpo.component').then(
        (m) => m.LpoComponent
      ),
  },
  {
    path: '',
    redirectTo: 'lpo',
    pathMatch: 'full',
  },
];