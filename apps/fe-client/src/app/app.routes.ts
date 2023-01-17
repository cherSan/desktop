import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'desktop',
    pathMatch: 'full'
  },
  {
    path: 'desktop',
    loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule),
  },
  {
    path: '*',
    redirectTo: 'work-space',
    pathMatch: 'full'
  }
];
