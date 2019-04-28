import { TestBed, inject } from '@angular/core/testing';

import { ActivationResolverService } from './activation-resolver.service';

describe('ActivationResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivationResolverService]
    });
  });

  it('should be created', inject([ActivationResolverService], (service: ActivationResolverService) => {
    expect(service).toBeTruthy();
  }));
});
