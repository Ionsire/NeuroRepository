import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCasoClinicoComponent } from './cadastro-caso-clinico.component';

describe('CadastroCasoClinicoComponent', () => {
  let component: CadastroCasoClinicoComponent;
  let fixture: ComponentFixture<CadastroCasoClinicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCasoClinicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCasoClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
