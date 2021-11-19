import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSimpleTopDownComponent } from './form-simple-top-down.component';

describe('FormSimpleTopDownComponent', () => {
  let component: FormSimpleTopDownComponent;
  let fixture: ComponentFixture<FormSimpleTopDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSimpleTopDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSimpleTopDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
