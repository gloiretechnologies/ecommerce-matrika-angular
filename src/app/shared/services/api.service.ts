import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  serverEndpoint = `${environment.apiUrl}`;
  public cartData$:Subject<any> = new Subject;
  public wishCountData$:Subject<any> = new Subject;
 
 
  constructor(
    private http: HttpClient
  ) {
    if (environment.production) {
      this.serverEndpoint = environment.apiUrl;
    }
  }
  cartData(data:any){
    this.cartData$.next(data)
   }
  wishlistData(data:any){
    this.wishCountData$.next(data);
   }
   
  
  /**
   *
   * @param endpoint
   * @param data
   * @param headers
   */
  post(endpoint: any, data: any, headers?: {}) {
    return this.http.post(this.serverEndpoint + endpoint, data, headers);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  get(endpoint: string, params?: {}) {
    return this.http.get(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  delete(endpoint: string, params?: {}) {
    return this.http.delete(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  put(endpoint: string, params?: {}) {
    return this.http.put(this.serverEndpoint + endpoint, params);
  }

}
