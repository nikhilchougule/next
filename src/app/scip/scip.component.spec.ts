import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScipComponent } from './scip.component';

describe('ScipComponent', () => {
  let component: ScipComponent;
  let fixture: ComponentFixture<ScipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
