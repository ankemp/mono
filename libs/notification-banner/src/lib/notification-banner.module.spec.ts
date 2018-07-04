import { async, TestBed } from '@angular/core/testing';
import { NotificationBannerModule } from './notification-banner.module';

describe('NotificationBannerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotificationBannerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NotificationBannerModule).toBeDefined();
  });
});
