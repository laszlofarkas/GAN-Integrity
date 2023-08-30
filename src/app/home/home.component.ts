import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book, BooksService } from '../books.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]> | undefined;

  private search$ = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books$ = this.search$.pipe(
      debounceTime(500),
      switchMap((search) => this.booksService.getLatest(3, search)),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.search$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search$.next(value);
  }
}
