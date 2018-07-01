import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducers } from './state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', reducers),
  ]
})
export class UiStateModule { }
