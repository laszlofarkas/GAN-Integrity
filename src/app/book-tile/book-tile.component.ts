import { Component, Input } from '@angular/core';
import { Book } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.scss'],
})
export class BookTileComponent {
  @Input() book!: Book;

  constructor(private router: Router) {}

  openDetail(id: Book['id']) {
    this.router.navigate(['book', id]);
  }
}
