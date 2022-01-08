import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule
  ],
  exports: [
    SharedModule
  ]
})
export class CoreModule { }
