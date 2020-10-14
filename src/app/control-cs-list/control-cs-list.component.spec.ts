import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCsListComponent } from './control-cs-list.component';

describe('ControlCsListComponent', () => {
  let component: ControlCsListComponent;
  let fixture: ComponentFixture<ControlCsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
