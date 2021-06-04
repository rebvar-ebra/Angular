import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './task.service';

describe('TaskService', () => {
  let service: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
