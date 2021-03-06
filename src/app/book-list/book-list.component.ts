import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {HttpClient} from '@angular/common/http'
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  
  public booksList: any[];
  @Input('books')
  set books(books: string) {
    console.log('got books: ', books);
    this.booksList = JSON.parse(books);
  }

  @Input()
  phoneNumber = '';

  @Output('bookSelected') bookSelected = new EventEmitter<any>();
  message = '';
  constructor(public bookService: BookService, private http: HttpClient, private cd: ChangeDetectorRef) {
    // tslint:disable-next-line:no-console
    console.debug(this.books);
  }

  ngOnInit(): void {
    this.bookService.getData().subscribe(data => {
      this.message = data;
    });
    console.log('before api call');
    this.http.get('https://api.github.com/').subscribe((data:any) => {
      console.log(data);
     // this.message = data.current_user_url;
      setTimeout(() => {
        this.bookService.message = 'after time out';
      }, 1000);
    })
    this.bookService.subeject.subscribe(data => {
      console.log(data + 'inside subject');
      this.message = data;
    })

    setTimeout(() => {
      this.bookService.message = 'after time out11111111';
    }, 5000);
    
  }

  selected(book: any) {
    this.bookSelected.emit(JSON.stringify(book));
  }
}
