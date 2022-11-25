import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }

   ObtenerInfoPagoEmpeno(Boleta : any, CodigoAuth :any, Referencia : any)
   {
     let body = {
      Boleta : Boleta,
      CodigoAuth : CodigoAuth,
      Referencia: Referencia
     }
 
     console.log(body);
     
       return this.http.post("https://consola.maxilana.com/api/consola/pagos/empeno", JSON.stringify(body), {
         headers: this.header
       }).pipe(map(res => res));
 
   }
   ObtenerInfoPagoPpOVale(Id : any, CodigoSucursal :any, CodigoVale : any)
   {
     let body = {
       Id : Id,
       CodigoSucursal : CodigoSucursal,
       CodigoVale: CodigoVale,
     }
 
     console.log(body);
     
       return this.http.post("https://consola.maxilana.com/api/consola/pagos/ppyvales", JSON.stringify(body), {
         headers: this.header
       }).pipe(map(res => res));
 
   }
}
