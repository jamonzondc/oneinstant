import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url: String = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

  

  public loadPostImage(name:string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}posts/images/${name}`);
  }

  public loadUserImage(name:string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}users/images/${name}`);
  }

  public upLoad(file:File, url:string, imageName:string):Observable<any>{
    
    const formData = new FormData();
    formData.append('image', file, file.name);
    const params = new HttpParams()
    .set('imageName', imageName)
    return this.httpClient.post(`${this.url}${url}/images`, formData,{params, reportProgress:true, observe:'events'});
  }

  public delete(url:string, imageName:string):Observable<any>{
    const params = new HttpParams()
    .set('imageName', imageName)
    return this.httpClient.delete(`${this.url}${url}/images`, {params});
  }
  
}
