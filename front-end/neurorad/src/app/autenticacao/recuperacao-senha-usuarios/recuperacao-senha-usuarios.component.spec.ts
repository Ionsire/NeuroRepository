import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacaoSenhaUsuariosComponent } from './recuperacao-senha-usuarios.component';

describe('RecuperacaoSenhaUsuariosComponent', () => {
  let component: RecuperacaoSenhaUsuariosComponent;
  let fixture: ComponentFixture<RecuperacaoSenhaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperacaoSenhaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacaoSenhaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
