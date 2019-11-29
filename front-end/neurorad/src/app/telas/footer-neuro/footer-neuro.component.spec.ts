import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNeuroComponent } from './footer-neuro.component';

describe('FooterNeuroComponent', () => {
  let component: FooterNeuroComponent;
  let fixture: ComponentFixture<FooterNeuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterNeuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNeuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
