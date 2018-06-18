import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthDialogComponent } from './oauth-dialog.component';

describe('OauthDialogComponent', () => {
  let component: OauthDialogComponent;
  let fixture: ComponentFixture<OauthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
