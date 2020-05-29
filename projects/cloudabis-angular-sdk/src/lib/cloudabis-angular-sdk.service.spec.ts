import { TestBed } from '@angular/core/testing';

import { CloudabisAngularSdkService } from './cloudabis-angular-sdk.service';

describe('CloudabisAngularSdkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudabisAngularSdkService = TestBed.get(CloudabisAngularSdkService);
    expect(service).toBeTruthy();
  });
});
