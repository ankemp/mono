import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {
  MatIconModule,
  MatRippleModule,
  MatToolbarModule
} from '@angular/material';

import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScrollDispatchModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule
  ],
  declarations: [BottomNavComponent],
  exports: [BottomNavComponent]
})
export class BottomNavModule {}
