import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Imprint } from './imprint/imprint';
import { LogInPage } from './log-in-page/log-in-page';

export const routes: Routes = [
    {path: '', component: LandingPage},
    {path: 'Impressum', component: Imprint},
    {path: 'login', component: LogInPage}
];
