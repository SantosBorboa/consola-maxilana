import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InicioService {
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }

   GetArticulos()
    {     
       return this.http.get("http://localhost:3050/api/consola/articulos" ).pipe(map(res => res));
 
   }
   resumenpagos()
   {     
      return this.http.get("http://localhost:3050/api/consola/resumenpagos" ).pipe(map(res => res));

  }
}
