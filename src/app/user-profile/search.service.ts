import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }
  Obtenerarticulos(nombre : any, tipo :any, plaza : any , preciomax : any, preciomin : any, gramosmax:any, gramosmin:any)
  {
    let body = {
      nombre : nombre,
      tipo : tipo,
      plazas: plaza,
      preciomax : preciomax,
      preciomin : preciomin,
      gramosmin:gramosmin,
      gramosmax:gramosmax
    }

    console.log(body);
    
      return this.http.post("http://localhost:3050/api/consola/articulos", JSON.stringify(body), {
        headers: this.header
      }).pipe(map(res => res));

  }
}
