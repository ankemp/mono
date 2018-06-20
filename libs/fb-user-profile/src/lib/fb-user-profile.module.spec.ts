import { async, TestBed } from '@angular/core/testing';
import { FbUserProfileModule } from './fb-user-profile.module';

describe('FbUserProfileModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FbUserProfileModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(FbUserProfileModule).toBeDefined();
  });
});
