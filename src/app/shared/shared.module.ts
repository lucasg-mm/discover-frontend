import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceManagerComponent } from './presentational-components/resource-manager/resource-manager.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResourceManagerComponent],
  imports: [CommonModule, FormsModule],
  exports: [ResourceManagerComponent],
})
export class SharedModule {}
