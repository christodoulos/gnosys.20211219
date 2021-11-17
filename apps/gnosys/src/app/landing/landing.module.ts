import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LandingComponent } from './landing/landing.component';
import { LandingTopbarComponent } from './landing-topbar/landing-topbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Route[] = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LandingTopbarComponent,
    outlet: 'topbar',
  },
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [LandingComponent, LandingTopbarComponent, SignupComponent, SigninComponent],
})
export class LandingModule {}
