import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomologacaoComponent } from './homologacao.component';

describe('HomologacaoComponent', () => {
  let component: HomologacaoComponent;
  let fixture: ComponentFixture<HomologacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomologacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomologacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
