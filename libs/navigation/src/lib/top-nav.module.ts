import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ScrollDispatchModule
  ],
  declarations: [TopNavComponent],
  exports: [TopNavComponent]
})
export class TopNavModule {}
