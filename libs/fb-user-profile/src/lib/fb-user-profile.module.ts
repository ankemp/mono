import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './fb-user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ],
  declarations: [ProfileComponent, PublicProfileComponent, ManageProfileComponent]
})
export class FbUserProfileModule { }
