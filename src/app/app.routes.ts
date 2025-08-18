import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Imprint } from './imprint/imprint';

export const routes: Routes = [
    {path: '', component: LandingPage},
    {path: 'Impressum', component: Imprint},
];
