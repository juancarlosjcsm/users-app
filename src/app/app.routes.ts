import { Route } from '@angular/router';
import { NotFoundComponent } from '../app/components/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: 'users',
    loadChildren: () => import('../app/pages/users-list/users-list.routes'),
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
