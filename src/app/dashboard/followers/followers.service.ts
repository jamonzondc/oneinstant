import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from 'src/app/model/story';
import { log } from 'util';
import { User } from 'src/app/model/user';
import { Follower } from 'src/app/model/follower';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {

  private url: String = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

  count(idUser: number, search: string, url:string): Observable<number> {
    const params = new HttpParams().set('search', search);
    return this.httpClient.get<number>(`${this.url}followers/${idUser}/${url}/count`, { params });
  }

   find(idUser: number, search: string, offset: string, limit: string, url:string): Observable<User[]> {
    const params = new HttpParams()
      .set('search', search)
      .set('offset', offset)
      .set('limit', limit);
    return this.httpClient.get<User[]>(`${this.url}followers/${idUser}/${url}`, { params });
  }
  

  following(follower: Follower): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.post(`${this.url}followers`, follower, { headers});
  }

  stopFollowing(idUser: number, following:number): Observable<any> {
    return this.httpClient.delete(`${this.url}followers/${idUser}/following/${following}`);
  }
}
