import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkdownComponent } from './walkdown.component';

describe('WalkdownComponent', () => {
  let component: WalkdownComponent;
  let fixture: ComponentFixture<WalkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
