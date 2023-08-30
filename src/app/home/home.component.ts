import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  books: Observable<Book[]> | undefined;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getLatest(3);
  }
}
