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
    path: 'receipt_returns',
    loadComponent: () =>
      import('./receipt_returns/receipt_returns.component').then(
        (m) => m.LpoReceiptReturnsComponent
      ),
  },
  {
    path: '',
    redirectTo: 'receipt',
    pathMatch: 'full',
  },
];