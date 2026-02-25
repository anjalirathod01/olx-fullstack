import { Routes } from '@angular/router';
import { App } from './app';

// Since everything is in App component,
// we use single route

export const routes: Routes = [
  { path: '', component: App },
  { path: '**', redirectTo: '' }
];