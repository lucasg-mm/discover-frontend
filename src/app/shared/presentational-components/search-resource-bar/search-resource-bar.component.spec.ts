import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResourceBarComponent } from './search-resource-bar.component';

describe('SearchResourceBarComponent', () => {
  let component: SearchResourceBarComponent;
  let fixture: ComponentFixture<SearchResourceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResourceBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResourceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
