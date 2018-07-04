import { async, TestBed } from '@angular/core/testing';
import { UiStateModule } from './ui-state.module';

describe('UiStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiStateModule).toBeDefined();
  });
});
