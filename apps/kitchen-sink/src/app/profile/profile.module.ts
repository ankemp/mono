import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FbUserProfileModule } from '@mono/fb-user-profile';
import { ProfileRoutingModule } from './profile-routing.module';

import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [CommonModule, FbUserProfileModule, ProfileRoutingModule],
  declarations: [EditProfileComponent]
})
export class ProfileModule {}
