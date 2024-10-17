import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add-image',
    loadComponent: () =>
      import('./add-image/add-image.component').then(
        (m) => m.AddImageComponent
      ),
  },
  {
    path: '',
    redirectTo: 'add-image',
    pathMatch: 'full',
  },
];