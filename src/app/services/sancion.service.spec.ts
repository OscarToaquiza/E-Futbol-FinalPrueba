import { TestBed, inject } from '@angular/core/testing';

import { SancionService } from './sancion.service';

describe('SancionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SancionService]
    });
  });

  it('should be created', inject([SancionService], (service: SancionService) => {
    expect(service).toBeTruthy();
  }));
});
