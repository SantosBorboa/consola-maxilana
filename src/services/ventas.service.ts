import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { FetchService } from './fetcher.service';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  baseApiUrl: string = 'https://consola.maxilana.com/api'
  public header: any;
  constructor(
    private http: HttpClient,
    private fetchService: FetchService,
  ) {
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json');
  }

  GetVentas() {
    return this.fetchService.Get(this.baseApiUrl + "/consola/pagos/ventas");
  }
  GetVentaespecifica(upc: any) {
    return this.fetchService.Get(this.baseApiUrl + "/consola/pagos/ventas?tipo=2&upc=" + upc);
  }
  GetReferencias(Referencia: any) {
    let body = {
      control: Referencia
    }
    console.log(body);
    return this.fetchService.Post(this.baseApiUrl + "/consola/pagos/control",body)
  }
}
interface test {
  ok: string;
}
