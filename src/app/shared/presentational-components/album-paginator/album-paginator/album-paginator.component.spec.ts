import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPaginatorComponent } from './album-paginator.component';

describe('AlbumPaginatorComponent', () => {
  let component: AlbumPaginatorComponent;
  let fixture: ComponentFixture<AlbumPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
