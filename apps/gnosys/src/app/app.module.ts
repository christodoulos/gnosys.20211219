import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppComponent } from './app.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgEffectsModule } from '@datorama/akita-ng-effects';
import { environment } from '../environments/environment';

import { GnosysUserEffects } from './state';

import { authInterceptorProviders } from './services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./landing.module/landing.module').then(
              (m) => m.LandingModule
            ),
        },
        {
          path: 'user',
          loadChildren: () =>
            import('./user.module/user.module').then((m) => m.UserModule),
        },
      ],
      { useHash: true }
    ),
    HttpClientModule,
    ReactiveFormsModule,

    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    AkitaNgEffectsModule.forRoot([GnosysUserEffects]),
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
