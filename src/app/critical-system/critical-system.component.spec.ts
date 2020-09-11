import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalSystemComponent } from './critical-system.component';

describe('CriticalSystemComponent', () => {
  let component: CriticalSystemComponent;
  let fixture: ComponentFixture<CriticalSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
