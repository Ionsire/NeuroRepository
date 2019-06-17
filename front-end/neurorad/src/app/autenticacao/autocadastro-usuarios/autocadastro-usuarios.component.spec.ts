import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocadastroUsuariosComponent } from './autocadastro-usuarios.component';

describe('AutocadastroUsuariosComponent', () => {
  let component: AutocadastroUsuariosComponent;
  let fixture: ComponentFixture<AutocadastroUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocadastroUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocadastroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
