import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'playground',
    loadComponent: () => import('./pages/playground/playground').then((m) => m.Playground),
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo/demo').then((m) => m.Demo),
  },
  {
    path: 'case-study',
    loadComponent: () => import('./pages/case-study/case-study').then((m) => m.CaseStudy),
  },
];
