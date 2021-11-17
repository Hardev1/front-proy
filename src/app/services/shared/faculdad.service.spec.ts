import { TestBed } from '@angular/core/testing';

import { FacultadService } from './facultad.service';

describe('FaculdadService', () => {
  let service: FacultadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
