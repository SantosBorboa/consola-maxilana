import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InicioService { 
  baseApiUrl: string = 'https://consola.maxilana.com/api'
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }

   GetArticulos()
    {     
       return this.http.get(this.baseApiUrl + "/consola/articulos" ).pipe(map(res => res));
 
   }
   resumenpagos()
   {     
      return this.http.get(this.baseApiUrl + "/consola/resumenpagos" ).pipe(map(res => res));

  }
}
