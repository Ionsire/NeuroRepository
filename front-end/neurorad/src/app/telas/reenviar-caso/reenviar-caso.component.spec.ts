import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenviarCasoComponent } from './reenviar-caso.component';

describe('ReenviarCasoComponent', () => {
  let component: ReenviarCasoComponent;
  let fixture: ComponentFixture<ReenviarCasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReenviarCasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenviarCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
