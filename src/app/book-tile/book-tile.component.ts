import { Component, Input } from '@angular/core';
import { Book } from '../books.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.scss'],
})
export class BookTileComponent {
  @Input() book!: Book;
}
