import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Book, BooksService } from '../books.service';
import {
  Observable,
  Subject,
  debounceTime,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  books$: Observable<Book[]> | undefined;
  searchControl: FormControl<string | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.books$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      tap((search) => this.updateUrl(search)),
      switchMap((search) => this.booksService.getLatest(3, search)),
      takeUntil(this.destroy$)
    );
  }

  ngAfterViewInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      this.searchControl.setValue(queryParams['search'] || '');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateUrl(search: string | null): void {
    const queryParams = search ? { search } : {};
    this.router.navigate([], {
      queryParams,
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
