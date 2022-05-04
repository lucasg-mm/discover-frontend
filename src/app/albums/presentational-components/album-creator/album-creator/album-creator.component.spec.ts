import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCreatorComponent } from './album-creator.component';

describe('AlbumCreatorComponent', () => {
  let component: AlbumCreatorComponent;
  let fixture: ComponentFixture<AlbumCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
