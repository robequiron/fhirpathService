/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FhirService } from '../services/fhir.service';

describe('Service: Fhir', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FhirService]
    });
  });

  it('should ...', inject([FhirService], (service: FhirService) => {
    expect(service).toBeTruthy();
  }));
});
