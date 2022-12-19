import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private postsUrl = "https://jsonplaceholder.typicode.com/posts"
  private photosUrl = "https://jsonplaceholder.typicode.com/photos"

  getPosts(): Observable<JSON[]> {
    return this.http.get<JSON[]>(this.postsUrl);
  }

  getPhotos(): Observable<JSON[]> {
    return this.http.get<JSON[]>(this.photosUrl);
  }

  getPhoto(id: number): Observable<any> {
    return this.http.get<any>(this.photosUrl + "/" + id.toString());
  }

  sendPost(post: string): Observable<any>{
    return this.http.post<any>(this.postsUrl, post, httpOptions)
  }
}
