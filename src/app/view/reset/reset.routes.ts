import { Routes } from '@angular/router';
import { RoleGuard } from '../../core/services/role.guard';

export const routes: Routes = [
  {
    path: 'reset_receipt',
    loadComponent: () =>
      import('./receipt/reset_receipt.component').then(
        (m) => m.ResetReceiptComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin'] }   
  },
  {
    path: 'reset_cmls',
    loadComponent: () =>
      import('./cmls/reset_cmls.component').then(
        (m) => m.ResetCmlsComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin'] }   
  },  
  {
    path: 'reset_receipt_returns',
    loadComponent: () =>
      import('./receipt_returns/reset_receipt_returns.component').then(
        (m) => m.ResetReceiptReturnsComponent
      ),
      canActivate: [RoleGuard], data: { roles: ['Admin'] }   
  },
  {
    path: '',
    redirectTo: 'reset_receipt',
    pathMatch: 'full',
  },
];