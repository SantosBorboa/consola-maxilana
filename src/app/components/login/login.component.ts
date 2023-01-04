import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
export class LoginComponent implements OnInit {
    usuario:string = '';
    password:string = '';

    private txtUsuario:HTMLInputElement;
    private txtPassword:HTMLInputElement;
    constructor(
        private loginService: LoginService,
        private router: Router,

    ){
    }
    ngOnInit(){
        this.txtUsuario = document.getElementById('usuario') as HTMLInputElement;
        this.txtPassword = document.getElementById('password') as HTMLInputElement;
        this.txtUsuario.addEventListener('focusout', (event)=>{
            this.usuario = this.txtUsuario.value;
        })
        this.txtPassword.addEventListener('focusout', (event)=>{
            this.password = this.txtPassword.value;
        })
    }
    keyPressUsuario(event: KeyboardEvent){
        if(event.key=='Enter'){
            console.log('enter');
            (<HTMLInputElement>document.getElementById('password')).focus();
        }
    }
    keyPressPassword(event: KeyboardEvent){
        if(event.key === 'Enter'){this.formSubmit()}
    }
    validateForm():boolean{
        if(this.txtUsuario.value == ''){return false}
        if(this.txtPassword.value == ''){return false}
        return true;
    }
    async formSubmit(){
        if(!this.validateForm()) {return}
        this.usuario = this.txtUsuario.value
        this.password = this.txtPassword.value
        const regex = new RegExp('^[0-9]+$')
        if(this.usuario == '') {
            return Swal.fire('Error', 'El usuario no ha sido capturado.', 'error')
        }
        if(!regex.test(this.usuario)){
            Swal.fire('Error', 'El usuario debe de ser numérico.', 'error')
            this.usuario = ''
            this.txtUsuario.value = ''
            this.txtUsuario.focus()
            return 
        }

        try {
            const user:LoginResult = await this.loginService.getUser(this.usuario, this.password)
            console.log(user)
            
            if(user.UsuarioCorrectoResult == false){
                Swal.fire('', 'Usuario/contraseña incorrecta, favor de volver a intentarlo.', 'error')
            }else{
                this.loginService.userName = user.strNombre;
                this.loginService.loggedIn = true;
                const ouser = {
                    userName:this.loginService.userName,
                    loggedIn:this.loginService.loggedIn,
                }
                localStorage.setItem('user', JSON.stringify(ouser))
                this.router.navigate(['Pagos']);
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }
}

interface LoginResult {
    UsuarioCorrectoResult?: boolean;
    strNombre?:string;
}