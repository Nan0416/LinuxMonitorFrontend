import { TestBed, inject } from '@angular/core/testing';

import { CommonAgentInstanceService } from './common-agent-instance.service';

describe('CommonAgentInstanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonAgentInstanceService]
    });
  });

  it('should be created', inject([CommonAgentInstanceService], (service: CommonAgentInstanceService) => {
    expect(service).toBeTruthy();
  }));
});
