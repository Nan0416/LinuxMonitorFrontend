import { TestBed, inject } from '@angular/core/testing';

import { AgentmetabyidResolverService } from './agentmetabyid-resolver.service';

describe('AgentmetabyidResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentmetabyidResolverService]
    });
  });

  it('should be created', inject([AgentmetabyidResolverService], (service: AgentmetabyidResolverService) => {
    expect(service).toBeTruthy();
  }));
});
