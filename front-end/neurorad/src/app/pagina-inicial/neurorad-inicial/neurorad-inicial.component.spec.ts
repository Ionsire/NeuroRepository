import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuroradInicialComponent } from './neurorad-inicial.component';

describe('NeuroradInicialComponent', () => {
  let component: NeuroradInicialComponent;
  let fixture: ComponentFixture<NeuroradInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuroradInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuroradInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
