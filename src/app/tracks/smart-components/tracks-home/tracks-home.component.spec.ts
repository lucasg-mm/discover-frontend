import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksHomeComponent } from './tracks-home.component';

describe('TracksHomeComponent', () => {
  let component: TracksHomeComponent;
  let fixture: ComponentFixture<TracksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
