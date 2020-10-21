import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdaTemplateComponent } from './cda-template.component';

describe('CdaTemplateComponent', () => {
  let component: CdaTemplateComponent;
  let fixture: ComponentFixture<CdaTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdaTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
