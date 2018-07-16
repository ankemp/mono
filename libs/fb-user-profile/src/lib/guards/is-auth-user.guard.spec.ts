import { TestBed, async, inject } from '@angular/core/testing';

import { IsAuthUserGuard } from './is-auth-user.guard';

describe('IsAuthUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAuthUserGuard]
    });
  });

  it('should ...', inject([IsAuthUserGuard], (guard: IsAuthUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
