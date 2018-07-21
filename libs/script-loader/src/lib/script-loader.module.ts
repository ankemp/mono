import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadScriptService } from './load-script.service';

@NgModule({
  imports: [CommonModule],
  providers: [LoadScriptService]
})
export class ScriptLoaderModule {}
