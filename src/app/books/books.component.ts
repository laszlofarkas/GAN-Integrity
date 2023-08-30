import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../books.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]> | undefined;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks();
  }

  openDetail(id: Book['id']) {
    this.router.navigate(['book', id]);
  }
}
