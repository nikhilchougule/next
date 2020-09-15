import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityControlTreeComponent } from './security-control-tree.component';

describe('SecurityControlTreeComponent', () => {
  let component: SecurityControlTreeComponent;
  let fixture: ComponentFixture<SecurityControlTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityControlTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityControlTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
