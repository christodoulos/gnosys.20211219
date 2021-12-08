import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiresafetyComponent } from './firesafety.component';

describe('FiresafetyComponent', () => {
  let component: FiresafetyComponent;
  let fixture: ComponentFixture<FiresafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiresafetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiresafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
