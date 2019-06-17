import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacaoUsuariosComponent } from './autenticacao-usuarios.component';

describe('AutenticacaoUsuariosComponent', () => {
  let component: AutenticacaoUsuariosComponent;
  let fixture: ComponentFixture<AutenticacaoUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticacaoUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
