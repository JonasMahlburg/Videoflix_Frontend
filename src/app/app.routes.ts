import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { Imprint } from './imprint/imprint';
import { LogInPage } from './log-in-page/log-in-page';
import { SignUpPage } from './sign-up-page/sign-up-page';

export const routes: Routes = [
    {path: '', component: LandingPage},
    {path: 'impressum', component: Imprint},
    {path: 'login', component: LogInPage},
    {path: 'signUp', component: SignUpPage},

];
