import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceManagerComponent } from './presentational-components/resource-manager/resource-manager.component';



@NgModule({
  declarations: [
    ResourceManagerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResourceManagerComponent
  ]
})
export class SharedModule { }
