import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { FetchService } from './fetcher.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  public header: any;
  private baseApiUrl:string = 'https://consola.maxilana.com/api'
  constructor(
    private http: HttpClient,
    private fetcherService: FetchService,
  ) {
    this.header = new HttpHeaders()
      .set('Content-Type', 'application/json');
  }

  ObtenerInfoPagoEmpeno(Boleta: any, CodigoAuth: any, Referencia: any) {
    let body = {
      Boleta: Boleta,
      CodigoAuth: CodigoAuth,
      Referencia: Referencia
    }

    console.log(body);

    return this.fetcherService.Post(this.baseApiUrl + "/consola/pagos/empeno", JSON.stringify(body));

  }
  ObtenerInfoPagoPpOVale(Id: any, CodigoSucursal: any, CodigoVale: any) {
    let body = {
      Id: Id,
      CodigoSucursal: CodigoSucursal,
      CodigoVale: CodigoVale,
    }

    console.log(body);

    return this.fetcherService.Post(this.baseApiUrl + "/consola/pagos/ppyvales", JSON.stringify(body));

  }
}
