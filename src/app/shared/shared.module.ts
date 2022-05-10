import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceManagerComponent } from './presentational-components/resource-manager/resource-manager.component';
import { FormsModule } from '@angular/forms';
import { ResourceTableComponent } from './presentational-components/resource-table/resource-table/resource-table.component';
import { SearchResourceBarComponent } from './presentational-components/search-resource-bar/search-resource-bar.component';

@NgModule({
  declarations: [ResourceManagerComponent, ResourceTableComponent, SearchResourceBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [ResourceManagerComponent],
})
export class SharedModule {}
