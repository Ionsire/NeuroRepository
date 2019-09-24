import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SabiaEnterComponent } from './sabia-enter.component';

describe('SabiarEnterComponent', () => {
  let component: SabiaEnterComponent;
  let fixture: ComponentFixture<SabiaEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SabiaEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SabiaEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
