import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from 'src/app/model/story';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class StorieService {

  private url: String = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.url}stories/count`);
  }

  findById(id: string): Observable<Story[]> {
    return this.httpClient.get<Story[]>(`${this.url}stories/${id}`);
  }

  findAll(offset: string, limit: string): Observable<Story[]> {
    const httpParams = new HttpParams()
      .set('offset', offset)
      .set('limit', limit);
    return this.httpClient.get<Story[]>(`${this.url}stories`, { params: httpParams });
  }

  save(story: Story): Observable<any> {
    const httpHeader = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    return this.httpClient.post(`${this.url}stories`, story, { headers: httpHeader });
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}stories/${id}`);
  }

a():void{
  log('Funciona La Inyeccion');
}
}
