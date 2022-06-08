import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresMainComponent } from './genres-main.component';

describe('GenresMainComponent', () => {
  let component: GenresMainComponent;
  let fixture: ComponentFixture<GenresMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
