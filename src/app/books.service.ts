import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export type Book = {
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
  private books: Record<string, Book> = {};

  constructor() {
    for (let i = 0; i < 10; i++) {
      const date = new Date('2023-01-01');
      date.setMonth(i);
      this.books[i] = {
        id: i,
        author: `author ${i}`,
        title: `title ${i}`,
        description: `Description ${i}`,
        releaseDate: date,
      };
    }
  }

  getBooks(): Observable<Book[]> {
    return of(Object.values(this.books));
  }

  getBookById(id: Book['id']): Observable<Book> {
    return of(this.books[id]);
  }

  searchBooks(searchText: string | null): Observable<Book[]> {
    return this.getBooks().pipe(
      map((books) => {
        if (!searchText) {
          return books;
        }
        const lowerCaseSearch = searchText.toLowerCase();
        return books.filter(
          (book) =>
            book.author.toLowerCase().includes(lowerCaseSearch) ||
            book.title.toLowerCase().includes(lowerCaseSearch) ||
            book.description.toLowerCase().includes(lowerCaseSearch)
        );
      })
    );
  }

  getLatest(count: number, searchText: string | null): Observable<Book[]> {
    return this.searchBooks(searchText).pipe(
      map((books) =>
        books
          .sort((a, b) => b.releaseDate.valueOf() - a.releaseDate.valueOf())
          .slice(0, count)
      )
    );
  }
}
