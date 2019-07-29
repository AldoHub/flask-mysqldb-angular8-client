import { TestBed } from '@angular/core/testing';

import { FlaskapiService } from './flaskapi.service';

describe('FlaskapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlaskapiService = TestBed.get(FlaskapiService);
    expect(service).toBeTruthy();
  });
});
