import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BookListComponent } from './book-list/book-list.component';
import { ChildComponent } from './child/child.component';
import { BookService } from 'src/app/book.service';
import {RouterModule, Routes} from '@angular/router'
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
const routes: Routes = [
  {
    path: '',
    component: ChildComponent
  }
]
@NgModule({
  declarations: [
    BookListComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [BookService],
  bootstrap: [],
  entryComponents: [
    BookListComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(BookListComponent, { injector });
    customElements.define('book-list', customElement);
  }

  ngDoBootstrap() { }
}
