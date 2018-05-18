import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(	private router: Router,
  				      private bookService: BookService,
  				      private route: ActivatedRoute) { }

  ngOnInit() {
  	this.book = new Book('','');
  	const id = this.route.snapshot.params['id'];
  	this.bookService.getSingleBook(+id).then(
  		(book: Book) => {
        console.log(book);
  			this.book = book;
  		}
  	);
  }

  onBack() {
  	this.router.navigate(['/books']);
  }

}
