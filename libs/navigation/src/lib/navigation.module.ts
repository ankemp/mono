import { NgModule } from '@angular/core';
import { TopNavModule } from './top-nav.module';
import { BottomNavModule } from './bottom-nav.module';

@NgModule({
  exports: [TopNavModule, BottomNavModule]
})
export class NavigationModule { }
