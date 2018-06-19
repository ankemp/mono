import { async, TestBed } from '@angular/core/testing';
import { TopNavModule } from './top-nav.module';

describe('TopNavModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TopNavModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(TopNavModule).toBeDefined();
  });
});
