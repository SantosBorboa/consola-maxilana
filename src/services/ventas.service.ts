import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public header : any;
  constructor(private http : HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json');
   }

   GetVentas()
    {     
       return this.http.get("https://consola.maxilana.com/api/consola/pagos/ventas" ).pipe(map(res => res));
 
   }
   GetVentaespecifica(upc: any)
   {     
    return this.http.get("https://consola.maxilana.com/api/consola/pagos/ventas?tipo=2&upc="+upc ).pipe(map(res => res));

  }
  GetReferencias(Referencia:any){
    let body = {
      control: Referencia
     }
 console.log(body);
     
       return this.http.post("https://consola.maxilana.com/api/consola/pagos/control", JSON.stringify(body), {
         headers: this.header
       }).pipe(map(res => res));
  }
}
