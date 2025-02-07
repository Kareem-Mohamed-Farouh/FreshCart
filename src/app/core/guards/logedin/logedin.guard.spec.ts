import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logedinGuard } from './logedin.guard';

describe('logedinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logedinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
