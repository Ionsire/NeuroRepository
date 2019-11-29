import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCasosComponent } from './usuario-casos.component';

describe('UsuarioCasosComponent', () => {
  let component: UsuarioCasosComponent;
  let fixture: ComponentFixture<UsuarioCasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
