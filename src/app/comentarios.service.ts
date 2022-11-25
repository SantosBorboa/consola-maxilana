import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }

  ObtenerComentariosApp(){
    return this.http.get("https://consola.maxilana.com/api/app/obtenercomentarios").pipe(map(res => res));
  }
}
