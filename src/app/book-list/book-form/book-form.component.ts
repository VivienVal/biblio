import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileURL: string;
  fileUploaded = false;

  constructor(	private router: Router,
  				private bookService: BookService,
  				private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
  	this.bookForm = this.formBuilder.group({
  		title: ['', Validators.required],
  		author: ['', Validators.required],
  		synopsis: ''
  	});
  }

  onSaveBook(){
  	const title = this.bookForm.get('title').value;
  	const author = this.bookForm.get('author').value;
  	const synopsis = this.bookForm.get('synopsis').value;
  	const newBook = new Book(title, author);
  	newBook.synopsis = synopsis;
    console.log('file url' + this.fileURL);
    if(this.fileURL && this.fileURL !== ''){
      newBook.photo = this.fileURL;
    }
    console.log(newBook);
  	this.bookService.createNewBook(newBook);
  	this.router.navigate(['/books']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileURL = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        console.log(this.fileURL);
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }
}
