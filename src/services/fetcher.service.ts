import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class FetchService {
    private apiBaseUrl: string = 'https://consola.maxilana.com/api'
    constructor(
        private http: HttpClient
    ) { }

    Post(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.apiBaseUrl}/security/gettoken`,
                { usuario: '@adminMaxilana2022@' },
                { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe((resp: GetTokenResponse) => {
                    this.http.post(url, data, {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'aurhorization': resp.token
                        }),
                    }).subscribe((response) => {
                        resolve(response)
                    }, (error: any) => { reject(error) })
                }, (error: any) => { reject(error) })
        })
    }

    Get(url: string) {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.apiBaseUrl}/security/gettoken`,
                { usuario: '@adminMaxilana2022@' },
                { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe((resp: GetTokenResponse) => {
                    this.http.get(url, {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'authorization': resp.token,
                        })
                    }).subscribe((response) => {
                        resolve(response)
                    }, (error: any) => { reject(error) })
                }, (error: any) => { reject(error) })
        })
    }
}

interface GetTokenResponse {
    token: string;
}