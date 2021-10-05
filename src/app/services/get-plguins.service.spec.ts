import { TestBed } from '@angular/core/testing';

import { GetPlguinsService } from './get-plguins.service';

describe('GetPlguinsService', () => {
  let service: GetPlguinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPlguinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
