import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: 'book',
    children: [
      { path: ':id', component: BookDetailsComponent, title: 'Book details' },
      { path: '**', component: BooksComponent, title: 'Books' },
    ],
  },
  { path: '**', component: HomeComponent, title: 'Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
