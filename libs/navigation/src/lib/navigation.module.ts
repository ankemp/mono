import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatRippleModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { TopNavComponent } from './top-nav/top-nav.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScrollDispatchModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  declarations: [TopNavComponent, BottomNavComponent],
  exports: [TopNavComponent, BottomNavComponent]
})
export class NavigationModule { }
