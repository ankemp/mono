import { async, TestBed } from '@angular/core/testing';
import { ScriptLoaderModule } from './script-loader.module';

describe('ScriptLoaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ScriptLoaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ScriptLoaderModule).toBeDefined();
  });
});
