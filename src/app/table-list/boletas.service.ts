import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BoletasService {
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }

  obtenerinfocliente(celular : any ){
    return this.http.get("http://localhost:3050/api/consola/infocliente/"+celular ).pipe(map(res => res));
  }

}
