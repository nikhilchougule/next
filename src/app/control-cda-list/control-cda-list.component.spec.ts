import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCdaListComponent } from './control-cda-list.component';

describe('ControlCdaListComponent', () => {
  let component: ControlCdaListComponent;
  let fixture: ComponentFixture<ControlCdaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCdaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCdaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
