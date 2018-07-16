import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { IsAuthUserGuard } from './guards';

const routes: Routes = [
  {
    path: ':uid',
    children: [
      {
        path: '',
        component: ManageProfileComponent,
        canActivate: [IsAuthUserGuard]
      },
      { path: 'public', component: PublicProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}
