import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCreatorComponent } from './artist-creator.component';

describe('ArtistCreatorComponent', () => {
  let component: ArtistCreatorComponent;
  let fixture: ComponentFixture<ArtistCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
