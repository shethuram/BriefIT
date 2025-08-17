import { TestBed } from '@angular/core/testing';

import { GroqApiService } from './groq-api.service';

describe('GroqApiService', () => {
  let service: GroqApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroqApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
