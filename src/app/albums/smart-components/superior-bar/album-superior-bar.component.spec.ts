import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSuperiorBarComponent } from './album-superior-bar.component';

describe('SuperiorBarComponent', () => {
  let component: AlbumSuperiorBarComponent;
  let fixture: ComponentFixture<AlbumSuperiorBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSuperiorBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSuperiorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
