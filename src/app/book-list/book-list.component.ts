import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  bookSubscription: Subscription;

  constructor(	private bookService: BookService,
  				private router: Router) { }

  ngOnInit() {
    this.bookService.getBooks();
  	this.bookSubscription = this.bookService.booksSubject.subscribe(
  		(books: Book[]) => {
  			this.books = books;
  		}
  	);
  	this.bookService.emitBooks();
  }

  onNewBook(){
  	this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book){
  	this.bookService.removeBook(book);
  }

  onViewBook(id: number){
  	this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy(){
  	this.bookSubscription.unsubscribe();
  }
}
