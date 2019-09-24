import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BntDoMenuComponent } from './bnt-do-menu.component';

describe('BntDoMenuComponent', () => {
  let component: BntDoMenuComponent;
  let fixture: ComponentFixture<BntDoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BntDoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BntDoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
