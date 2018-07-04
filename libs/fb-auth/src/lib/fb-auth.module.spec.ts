import { async, TestBed } from '@angular/core/testing';
import { FbAuthModule } from './fb-auth.module';

describe('FbAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FbAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FbAuthModule).toBeDefined();
  });
});
