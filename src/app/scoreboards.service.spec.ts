import { TestBed } from '@angular/core/testing';

import { ScoreboardsService } from './scoreboards.service';

describe('ScoreboardsService', () => {
  let service: ScoreboardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreboardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
