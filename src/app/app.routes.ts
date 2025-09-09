import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { VideoPageComponent } from './video-page/video-page';
import { Imprint } from './imprint/imprint';
import { LogInPage } from './log-in-page/log-in-page';
import { SignUpPage } from './sign-up-page/sign-up-page';
import { ResetPage } from './reset-page/reset-page';
import { ForgotPage } from './forgot-page/forgot-page';
import { VideoPreloadResolver } from './video-preload-resolver';


export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'impressum', component: Imprint },
    { path: 'login', component: LogInPage },
    { path: 'signUp', component: SignUpPage },
    { path: 'reset_pw', component: ResetPage },
    { 
      path: 'videos', 
      component: VideoPageComponent,
      resolve: {
        videos: VideoPreloadResolver // Füge den Resolver hinzu
      }
    },
    { path: 'forgot_pw', component: ForgotPage },
];