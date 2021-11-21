import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';

import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';

import { UiModule } from '@gnosys/ui';

import { LandingComponent } from './landing/landing.component';
import { LandingTopbarComponent } from './landing-topbar/landing-topbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { GnosysUserEffects } from '../state';

export const routes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: '',
    component: LandingTopbarComponent,
    outlet: 'topbar',
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'This field is requiredThis field is required',
          email: 'This is not an email',
          minlength: ({ requiredLength, actualLength }) =>
            `Expected length is ${requiredLength} but got ${actualLength}`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
    RouterModule.forChild(routes),
    AkitaNgEffectsModule.forFeature([GnosysUserEffects]),

    UiModule,
  ],
  declarations: [
    LandingComponent,
    LandingTopbarComponent,
    SignupComponent,
    SigninComponent,
  ],
})
export class LandingModule {}
