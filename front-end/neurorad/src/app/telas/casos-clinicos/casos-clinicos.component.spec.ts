import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosClinicosComponent } from './casos-clinicos.component';

describe('CasosClinicosComponent', () => {
  let component: CasosClinicosComponent;
  let fixture: ComponentFixture<CasosClinicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasosClinicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasosClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
