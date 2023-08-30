import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

type Book = {
  id: number;
  author: string;
  title: string;
  description: string;
  releaseDate: Date;
};

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private books: Book[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      const date = new Date('2023-01-01');
      date.setMonth(i);
      this.books.push({
        id: i,
        author: `author ${i}`,
        title: `title ${i}`,
        description: `Description ${i}`,
        releaseDate: date,
      });
    }
  }

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }
}
