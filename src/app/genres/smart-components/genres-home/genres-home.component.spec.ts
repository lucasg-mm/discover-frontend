import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresHomeComponent } from './genres-home.component';

describe('GenresHomeComponent', () => {
  let component: GenresHomeComponent;
  let fixture: ComponentFixture<GenresHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
