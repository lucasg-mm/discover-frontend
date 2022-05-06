import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMainComponent } from './album-main.component';

describe('AlbumMainComponent', () => {
  let component: AlbumMainComponent;
  let fixture: ComponentFixture<AlbumMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
