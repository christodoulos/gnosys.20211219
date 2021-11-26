import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';

import { UiModule } from '@gnosys/ui';

import { LandingComponent } from './landing/landing.component';
import { LandingTopbarComponent } from './landing-topbar/landing-topbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { GnosysUserEffects } from '../state';
import { VerifyComponent } from './verify/verify.component';
import { ResetComponent } from './reset/reset.component';

export const routes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: '',
    component: LandingTopbarComponent,
    outlet: 'topbar',
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'verify/:verification', component: VerifyComponent },
  { path: 'reset/:verification', component: ResetComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes),
    AkitaNgEffectsModule.forFeature([GnosysUserEffects]),

    UiModule,
  ],
  declarations: [
    LandingComponent,
    LandingTopbarComponent,
    SignupComponent,
    SigninComponent,
    VerifyComponent,
    ResetComponent,
  ],
})
export class LandingModule {}
