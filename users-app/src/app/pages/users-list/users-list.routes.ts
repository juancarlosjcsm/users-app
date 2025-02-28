import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-list.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('../user-detail/user-detail.component'),
  },
];
export default routes;
