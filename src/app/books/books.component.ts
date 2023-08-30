import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]> | undefined;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks();
  }
}
