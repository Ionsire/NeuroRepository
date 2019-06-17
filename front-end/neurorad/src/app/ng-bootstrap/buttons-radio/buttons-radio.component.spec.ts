import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsRadioComponent } from './buttons-radio.component';

describe('ButtonsRadioComponent', () => {
  let component: ButtonsRadioComponent;
  let fixture: ComponentFixture<ButtonsRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
