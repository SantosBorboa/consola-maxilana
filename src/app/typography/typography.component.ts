import { Component, OnInit } from '@angular/core';
import { VentasService } from 'services/ventas.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})

export class TypographyComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  public DataArticulos : any =[];
  public items : any=[];
  public Ventas : any = 0;
  public KeyedCollection: any[] = [];
  constructor(private _vtas : VentasService) { }

  ngOnInit() {
    this.cargarVtas();
  }
  cargarVtas(){
    (<HTMLInputElement>document.getElementById("upc")).value = "";
    this.blockUI.start("Cargando ventas...");
    this._vtas.GetVentas().then(data=>{
      this.DataArticulos = data;
      this.Ventas = 0;
      this.items = [];
      for(var i = 0 ; i < this.DataArticulos.length ; i++) {

        this.items.push({
          Ref : this.DataArticulos[i].reference,
          Recibo : this.DataArticulos[i].Recibo,
          Numcon : this.DataArticulos[i].control_number,
          Auth : this.DataArticulos[i].auth_code,
          Upc: this.DataArticulos[i].upc,
          Correo: this.DataArticulos[i].correoelectronico,
          Sucursal: this.DataArticulos[i].codigosucursal+"-"+this.DataArticulos[i].nombresucursal,
          Fecha: this.DataArticulos[i].cust_req_date,
          Monto:this.DataArticulos[i].monto
          
        })

      }
      this.Ventas = this.DataArticulos.length;

      this.blockUI.stop();
    })
    .catch(err => {
      Swal.fire('Error', err.message, 'error');
    });
  }
  Detallepago(info){
    let Arr = info.Numcon;
    let Response  : any =[];
    this.blockUI.start("Buscando información...");
    this._vtas.GetReferencias(Arr).then(data=>{
      Response = data;
      if(!Response){
        this.blockUI.stop()
        Swal.fire('', 'No hay datos que mostrar.', 'info')
        return
      }
      if(Response.pagoapp == 1){
        Response.pagoapp = "App";
      }else{
        Response.pagoapp = "Web";
      }
      this.blockUI.stop();
      Swal.fire({
        width:1400,
        title: '<strong>Número de control: <u>'+Arr+'</u></strong>',
        icon: 'info',
        html:
          'La información mostrada es referente al pago realizado por el cliente.' +
          '<br>'+
          '<table class="table table-hover">'+
          '<thead class="text-warning">'+
           '   <th>UPC</th>'+
           '  <th>MONTO</th>'+
           '  <th>ECI</th>'+
           '   <th>CAVV</th>'+
           '   <th>XID</th>'+
           '   <th>STATUS</th>'+
           '   <th>T/TARJETA</th>'+
           '   <th>CANAL VENTA</th>'+
           '</thead>'+
           '<tbody>'+
           '<tr>'+
           ' <th>'+Response.upc+'</th>'+
           '  <th>'+Response.monto+'</th>'+
           ' <th>'+Response.eci+'</th>'+
           ' <th>'+Response.cavv+'</th>'+
           ' <th>'+Response.xid+'</th>'+
           ' <th>'+Response.status+'</th>'+
           ' <th>'+Response.cardtype+'</th>'+
           ' <th>'+Response.pagoapp+'</th>'+
           ' </tr>'+
           '</tbody>' ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Listo!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonAriaLabel: 'Thumbs down'
      });
    });

 
  }
  onSubmit(){

    var upc = (<HTMLInputElement>document.getElementById("upc")).value;
    console.log(upc);
    if(upc !== ""){
      this.blockUI.start("Buscando venta...")
      this._vtas.GetVentaespecifica(upc).then(data=>{
        this.DataArticulos = data;
        this.Ventas = 0;
        this.items = [];
        for(var i = 0 ; i < this.DataArticulos.length ; i++) {
  
          this.items.push({
            Ref : this.DataArticulos[i].reference,
            Recibo : this.DataArticulos[i].Recibo,
            Numcon : this.DataArticulos[i].control_number,
            Auth : this.DataArticulos[i].auth_code,
            Upc: this.DataArticulos[i].upc,
            Correo: this.DataArticulos[i].correoelectronico,
            Sucursal: this.DataArticulos[i].codigosucursal+"-"+this.DataArticulos[i].nombresucursal,
            Fecha: this.DataArticulos[i].cust_req_date,
            Monto:this.DataArticulos[i].monto
            
          })
  
        }
        this.Ventas = this.DataArticulos.length;
  
        this.blockUI.stop();
      });
    }else{
      this.cargarVtas();
    }

  }

}
