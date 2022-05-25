import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsHomeComponent } from './artists-home.component';

describe('ArtistsHomeComponent', () => {
  let component: ArtistsHomeComponent;
  let fixture: ComponentFixture<ArtistsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
