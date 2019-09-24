import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendenciasUsuariosComponent } from './pendencias-usuarios.component';

describe('PendenciasUsuariosComponent', () => {
  let component: PendenciasUsuariosComponent;
  let fixture: ComponentFixture<PendenciasUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendenciasUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendenciasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
