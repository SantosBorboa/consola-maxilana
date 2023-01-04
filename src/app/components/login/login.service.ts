import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { FetchService } from 'services/fetcher.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    public userName: string = '';
    public loggedIn: boolean = false;

    constructor(
        private fetcherService: FetchService,
        private router: Router,
    ){
        const ruser = localStorage.getItem('user');
        if(ruser){
            const odata = JSON.parse(ruser);
            this.userName = odata.userName;
            this.loggedIn = odata.loggedIn;
        }
    }

    logOut(): void {
        this.userName = '';
        this.loggedIn = false;
        const data = {
            userName:this.userName,
            loggedIn:this.loggedIn,
        }
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['Login']);
    }
    
    getUser(usuario:string, password:string){
        return new Promise((resolve, reject) => {
            this.fetcherService.Post('https://consola.maxilana.com/api/consola/login', {user:usuario, password})
            .then((response) => {resolve(response)})
            .catch((error) => {reject(error)})
        })
    }
}