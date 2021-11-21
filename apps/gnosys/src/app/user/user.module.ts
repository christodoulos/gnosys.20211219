import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { UserLandingComponent } from './user-landing/user-landing.component';

export const userRoutes: Route[] = [
  { path: '', component: UserLandingComponent },
];

@NgModule({
  declarations: [UserLandingComponent],
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
})
export class UserModule {}
