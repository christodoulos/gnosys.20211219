import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTopbarComponent } from './landing-topbar.component';

describe('LandingTopbarComponent', () => {
  let component: LandingTopbarComponent;
  let fixture: ComponentFixture<LandingTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
