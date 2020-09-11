import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCdaComponent } from './view-cda.component';

describe('ViewCdaComponent', () => {
  let component: ViewCdaComponent;
  let fixture: ComponentFixture<ViewCdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
