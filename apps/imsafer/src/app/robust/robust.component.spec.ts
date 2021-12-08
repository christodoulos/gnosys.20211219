import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobustComponent } from './robust.component';

describe('RobustComponent', () => {
  let component: RobustComponent;
  let fixture: ComponentFixture<RobustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
