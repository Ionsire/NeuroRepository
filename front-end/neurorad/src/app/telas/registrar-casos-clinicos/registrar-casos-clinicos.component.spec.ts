import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCasosClinicosComponent } from './registrar-casos-clinicos.component';

describe('RegistrarCasosClinicosComponent', () => {
  let component: RegistrarCasosClinicosComponent;
  let fixture: ComponentFixture<RegistrarCasosClinicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCasosClinicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCasosClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
