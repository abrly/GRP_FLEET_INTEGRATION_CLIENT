import { Routes } from '@angular/router';
import { AuthGaurd } from './core/services/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'image',
    loadChildren: () =>
      import('./view/image/image.routes').then((m) => m.routes),
  },
  {
    path: 'export',
    loadChildren: () =>
      import('./view/export/export.routes').then((m) => m.routes),
  },
];


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'session/sign-in',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/auth/auth.component').then(
        (m) => m.AuthComponent
      ),
    children: [
      {
        path: 'session',
        loadChildren: () =>
          import('./view/session/session.routes').then((m) => m.routes),          
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/blank/blank.component').then(
        (m) => m.BlankComponent
      ),
    children: [
      {
        path: 'others',
        loadChildren: () =>
          import('./view/others/others.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGaurd],
    loadComponent: () =>
      import('./shared/layouts/admin/admin.component').then(
        (m) => m.AdminComponent
      ),
    children: adminRoutes,
  },

  {
    path: '**',
    redirectTo: 'others/404',
  },
];