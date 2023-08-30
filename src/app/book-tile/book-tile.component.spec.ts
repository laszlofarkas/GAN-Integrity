import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTileComponent } from './book-tile.component';

describe('BookTileComponent', () => {
  let component: BookTileComponent;
  let fixture: ComponentFixture<BookTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookTileComponent]
    });
    fixture = TestBed.createComponent(BookTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
