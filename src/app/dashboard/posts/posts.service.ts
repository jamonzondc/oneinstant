import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/model/post';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: String = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

  

  findById(id: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.url}posts/${id}`);
  }

  countPostsFollowers(userId:number): Observable<number> {
    return this.httpClient.get<number>(`${this.url}users/${userId}/postsfollowers/count`);
  }

  findAllPostsFollowers(userId:number, offset: string, limit: string): Observable<Post[]> {
    const params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit);
    return this.httpClient.get<Post[]>(`${this.url}users/${userId}/postsfollowers`, { params });
  }

  countMyPost(userId:number): Observable<number> {
    return this.httpClient.get<number>(`${this.url}users/${userId}/posts/count`);
  }

  findAllMyPosts(userId:number, offset: string, limit: string): Observable<Post[]> {
    const params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit);
    return this.httpClient.get<Post[]>(`${this.url}users/${userId}/posts`, { params });
  }

  save(post: Post): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.post(`${this.url}posts`, post, { headers });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}posts/${id}`);
  }
}
