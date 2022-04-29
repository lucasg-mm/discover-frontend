import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsHomeComponent } from './albums-home.component';

describe('AlbumsHomeComponent', () => {
  let component: AlbumsHomeComponent;
  let fixture: ComponentFixture<AlbumsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
