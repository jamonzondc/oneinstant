import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private url: String = environment.urlApi;

  constructor(private httpClient: HttpClient) { }
 
  findAll(post:number, offset: number, limit: number): Observable<Comment[]> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());
    return this.httpClient.get<Comment[]>(`${this.url}posts/${post}/comments`, { params });
  }

  count(post:number): Observable<number> {
    return this.httpClient.get<number>(`${this.url}posts/${post}/comments/count`);
  }

  save(post:number, comment: Comment): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.post(`${this.url}posts/${post}/comments`, comment, { headers });
  }

  delete(post:number, comment: number): Observable<any> {
    return this.httpClient.delete(`${this.url}posts/${post}/comments/${comment}`);
  }
}
