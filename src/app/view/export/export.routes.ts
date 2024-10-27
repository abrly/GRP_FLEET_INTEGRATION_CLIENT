import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'receipt',
    loadComponent: () =>
      import('./receipt/receipt.component').then(
        (m) => m.LpoReceiptComponent
      ),
  },
  {
    path: 'cmls',
    loadComponent: () =>
      import('./cmls/cmls.component').then(
        (m) => m.CmlsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'receipt',
    pathMatch: 'full',
  },
];