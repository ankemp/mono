import { async, TestBed } from '@angular/core/testing';
import { BottomNavModule } from './bottom-nav.module';

describe('BottomNavModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [BottomNavModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(BottomNavModule).toBeDefined();
  });
});
