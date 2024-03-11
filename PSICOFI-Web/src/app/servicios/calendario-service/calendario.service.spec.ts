import { TestBed } from '@angular/core/testing';

import { AgendarCitaService } from './calendario.service';

describe('ClientesService', () => {
  let service: AgendarCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendarCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
