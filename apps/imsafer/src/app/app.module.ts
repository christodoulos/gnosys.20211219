import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { UiModule } from '@gnosys/ui';

import { AppComponent } from './app.component';
import { RobustComponent } from './robust/robust.component';
import { FiresafetyComponent } from './firesafety/firesafety.component';
import { EvacuationComponent } from './evacuation/evacuation.component';
import { RiskComponent } from './risk/risk.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    RobustComponent,
    FiresafetyComponent,
    EvacuationComponent,
    RiskComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'robust', component: RobustComponent },
      { path: 'firesafety', component: FiresafetyComponent },
      { path: 'evacuation', component: EvacuationComponent },
      { path: 'risk', component: RiskComponent },
    ]),
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
