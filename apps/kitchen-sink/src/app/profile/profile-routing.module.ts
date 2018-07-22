import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsAuthUserGuard, PublicProfileComponent } from '@mono/fb-user-profile';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: ':uid', canActivate: [IsAuthUserGuard] },
  { path: ':uid/edit', component: EditProfileComponent },
  { path: ':uid/public', component: PublicProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
