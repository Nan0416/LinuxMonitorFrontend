import { TestBed, inject } from '@angular/core/testing';

import { AgentmetaResolverService } from './agentmeta-resolver.service';

describe('AgentmetaResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentmetaResolverService]
    });
  });

  it('should be created', inject([AgentmetaResolverService], (service: AgentmetaResolverService) => {
    expect(service).toBeTruthy();
  }));
});
