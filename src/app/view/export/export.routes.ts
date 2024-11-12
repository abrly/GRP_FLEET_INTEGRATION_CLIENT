import { Routes } from '@angular/router';
import { RoleGuard } from '../../core/services/role.guard';

export const routes: Routes = [
  {
    path: 'receipt',
    loadComponent: () =>
      import('./receipt/receipt.component').then(
        (m) => m.LpoReceiptComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin','User'] }   
  },
  {
    path: 'cmls',
    loadComponent: () =>
      import('./cmls/cmls.component').then(
        (m) => m.CmlsComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin','User'] }   
  },  
  {
    path: 'receipt_returns',
    loadComponent: () =>
      import('./receipt_returns/receipt_returns.component').then(
        (m) => m.LpoReceiptReturnsComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin','User'] }   
  },
  {
    path: '',
    redirectTo: 'receipt',
    pathMatch: 'full',
  },
];