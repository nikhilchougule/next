import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalDigitalAssetListComponent } from './critical-digital-asset-list.component';

describe('CriticalDigitalAssetListComponent', () => {
  let component: CriticalDigitalAssetListComponent;
  let fixture: ComponentFixture<CriticalDigitalAssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalDigitalAssetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalDigitalAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
