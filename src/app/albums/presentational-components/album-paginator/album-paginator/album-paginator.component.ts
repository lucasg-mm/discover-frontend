import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-paginator',
  templateUrl: './album-paginator.component.html',
  styleUrls: ['./album-paginator.component.css'],
})
export class AlbumPaginatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  currPage: number = 1;

  @Input()
  finalPage: number = 10;

  goToPage(pageNumber: number): void{
    this.currPage = pageNumber;
  }

  previousPage(): void{
    if (this.currPage !== 1) {
      this.currPage--;
    }
  }

  nextPage(): void{
    if (this.currPage !== this.finalPage) {
      this.currPage++;
    }
  }

  isPageTheFirst(pageNumber: number): boolean{
    return pageNumber === 1;
  }

  isPageTheFinal(pageNumber: number): boolean{
    return pageNumber === this.finalPage
  }

  // tells if there are pages between lowerPageNumber and upperPageNumber
  pagesBetweenExist(lowerPageNumber: number, upperPageNumber: number): boolean{
    return upperPageNumber - lowerPageNumber - 1 > 0;
  }
}
