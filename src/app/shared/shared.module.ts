import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceManagerComponent } from './presentational-components/resource-manager/resource-manager.component';
import { FormsModule } from '@angular/forms';
import { ResourceTableComponent } from './presentational-components/resource-table/resource-table/resource-table.component';
import { SearchResourceBarComponent } from './presentational-components/search-resource-bar/search-resource-bar.component';
import { AlbumPaginatorComponent } from './presentational-components/album-paginator/album-paginator/album-paginator.component';
import { ConfirmationModalComponent } from './presentational-components/confirmation-modal/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    ResourceManagerComponent,
    ResourceTableComponent,
    SearchResourceBarComponent,
    AlbumPaginatorComponent,
    ConfirmationModalComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ResourceManagerComponent,
    AlbumPaginatorComponent,
    ConfirmationModalComponent,
    SearchResourceBarComponent,
  ],
})
export class SharedModule {}
