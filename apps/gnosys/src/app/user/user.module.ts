import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserTopbarComponent } from './user-topbar/user-topbar.component';

export const userRoutes: Route[] = [
  { path: '', component: UserLandingComponent },
  { path: '', component: UserTopbarComponent, outlet: 'topbar' },
];

@NgModule({
  declarations: [UserLandingComponent, UserTopbarComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {}
