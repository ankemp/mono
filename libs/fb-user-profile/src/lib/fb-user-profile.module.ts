import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTabsModule } from '@angular/material';

import { UserProfileRoutingModule } from './fb-user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AccountDetailsFormComponent } from './account-details-form/account-details-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    UserProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    PublicProfileComponent,
    ManageProfileComponent,
    AccountDetailsFormComponent
  ]
})
export class FbUserProfileModule {}
