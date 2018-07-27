import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule,
  MatInputModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import { reducer } from './state/profile.reducer';
import { ProfileEffects } from './state/profile.effects';

import { PublicProfileComponent } from './public-profile/public-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AccountDetailsFormComponent } from './account-details-form/account-details-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('profile', reducer),
    EffectsModule.forFeature([ProfileEffects]),
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule
  ],
  declarations: [
    PublicProfileComponent,
    ManageProfileComponent,
    AccountDetailsFormComponent
  ],
  exports: [ManageProfileComponent]
})
export class FbUserProfileModule {}
