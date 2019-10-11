import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private url: String = environment.urlApi;
  
  constructor(private httpClient: HttpClient) { }

  public upLoad(file:File, url:string):Observable<any>{
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post(`${this.url}${url}`, formData);
  }
}
