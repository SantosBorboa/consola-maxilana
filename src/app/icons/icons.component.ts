import { Component, OnInit } from '@angular/core';
import { PagosService } from 'services/pagos.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  public items : any=[];
  public DataArticulos : any =[];
  @BlockUI() blockUI: NgBlockUI;
  constructor(private Pays : PagosService) { }

  ngOnInit() {
  }
  onSubmit(){


    var EsPrestamo = (<HTMLInputElement>document.getElementById("Pyvales")).checked;
    var EsEmpeno = (<HTMLInputElement>document.getElementById("Empenov")).checked;
    var Boleta = (<HTMLInputElement>document.getElementById("Bol")).value;
    var Auth = (<HTMLInputElement>document.getElementById("Auth")).value;
    var Ref = (<HTMLInputElement>document.getElementById("Ref")).value;

    if(Boleta !== ""){
      Auth = "0";
      Ref = "0";
    }else if(Auth !== ""){
      Boleta = "0";
      Ref = "0";
    }else if(Ref !== ""){
      Boleta = "0";
      Auth = "0";
    }else{
      Boleta = "0";
      Auth = "0";
      Ref="0";
    }

    if(EsPrestamo){

    }else{
      if(EsEmpeno){
        this.blockUI.start("Buscando información...")
          this.Pays.ObtenerInfoPagoEmpeno(Boleta,Auth,Ref).subscribe(Data=>{
            this.DataArticulos  = Data
            this.items=[];
              for(var i = 0 ; i< this.DataArticulos.length ; i++){
                var pagoapp = "";
                var codigotpago = ""
                var resul = ""
                if(this.DataArticulos[i]['pagoapp'] == "0"){
                  pagoapp = "Página web";
                }else{
                  pagoapp = "Aplicación"
                }
                if(this.DataArticulos[i]['codigotipopago'] == "1"){
                  codigotpago = "Pago de interés";
                }else{
                  codigotpago = "Abono interés"
                }
                if(this.DataArticulos[i]['payw_result'] == "A"){
                  resul = "Aprobado";
                }else{
                  resul = "Rechazado"
                }
                this.items.push({
                  id: this.DataArticulos[i]['id'],
                  Boleta: this.DataArticulos[i]['boleta'],
                  Monto: this.DataArticulos[i]['monto'],
                  Referencia: this.DataArticulos[i]['reference'],
                  Control: this.DataArticulos[i]['auth_code'],
                  Fecha: this.DataArticulos[i]['FechaPago'],
                  Sucursal: this.DataArticulos[i]['codigosucursal'],
                  Resultado: resul,
                  Recibo: this.DataArticulos[i]['Recibo'],
                  tdsecure: "200",
                  Correo: this.DataArticulos[i]['correoelectronico'],
                  Tipopago: codigotpago,
                  Diaspagados: this.DataArticulos[i]['diaspagados'],
                  Canaldepago: pagoapp,
                  
                })
                this.blockUI.stop();
              } 
          });
      }
    }
  }
  onSubmitIntentos(){
    Swal.fire({
      title: 'Ingrese la boleta a buscar',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Buscar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  
  }
 

  change(data : any){
    console.log(data);


    if(data == 1){
      (<HTMLInputElement>document.getElementById("Pyvales")).checked = false;
      (<HTMLInputElement>document.getElementById("ppyvales")).style.display="none";
      (<HTMLInputElement>document.getElementById("empeno")).style.display="flex";
      (<HTMLInputElement>document.getElementById("tableEmpeno")).style.display="initial";

      (<HTMLInputElement>document.getElementById("tablePP")).style.display="none";
    }
    if(data == 2){
      (<HTMLInputElement>document.getElementById("Empenov")).checked = false;
      (<HTMLInputElement>document.getElementById("empeno")).style.display="none";
      (<HTMLInputElement>document.getElementById("ppyvales")).style.display="flex";
      (<HTMLInputElement>document.getElementById("tablePP")).style.display="initial";
      
      (<HTMLInputElement>document.getElementById("tableEmpeno")).style.display="none";
    }


  }
  IngresoDatos(data : any){
    console.log(data);


    if(data == 1){
      (<HTMLInputElement>document.getElementById("Auth")).value = "";
      (<HTMLInputElement>document.getElementById("Ref")).value = "";
    }
    if(data == 2){
      (<HTMLInputElement>document.getElementById("Bol")).value = "";
      (<HTMLInputElement>document.getElementById("Ref")).value = "";
    }
    if(data == 3){
      (<HTMLInputElement>document.getElementById("Bol")).value = "";
      (<HTMLInputElement>document.getElementById("Auth")).value = "";
    }
  }
}
