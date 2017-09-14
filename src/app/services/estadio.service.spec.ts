import { TestBed, inject } from '@angular/core/testing';

import { EstadioService } from './estadio.service';

describe('EstadioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadioService]
    });
  });

  it('should be created', inject([EstadioService], (service: EstadioService) => {
    expect(service).toBeTruthy();
  }));
});
