import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Subject } from "rxjs/internal/Subject";
@Injectable()
export class BookService {
    message = 'new value';
    subeject = new Subject<string>()
    constructor(private http: HttpClient) {
        this.getData();
        this.subeject.next('test subject');
    }
    getData() {
        return this.http.get('https://api.github.com/',{}).pipe(
            map((data:any) => {
                console.log(data.current_user_url);                
                return data.current_user_url;
            })
        )
    }
}