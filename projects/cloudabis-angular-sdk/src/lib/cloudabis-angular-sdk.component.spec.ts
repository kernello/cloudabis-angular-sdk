import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudabisAngularSdkComponent } from './cloudabis-angular-sdk.component';

describe('CloudabisAngularSdkComponent', () => {
  let component: CloudabisAngularSdkComponent;
  let fixture: ComponentFixture<CloudabisAngularSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudabisAngularSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudabisAngularSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
