import { TestBed } from '@angular/core/testing';

import { UserAddresService } from './user-addres.service';

describe('UserAddresService', () => {
  let service: UserAddresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAddresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
