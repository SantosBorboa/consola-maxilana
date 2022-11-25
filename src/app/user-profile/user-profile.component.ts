import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public DataArticulos : any =[];
  public items : any=[];
  public imgArticulo : any;
  public DesArticulo : any;
  public Precio : any;
  public PrecioNeto : any;
  public Sucursal : any;
  public Upc: any;

  @BlockUI() blockUI: NgBlockUI;
  constructor(private search : SearchService) { }

  ngOnInit() {
  //  this.Cargararticulos("","","","","","","");
  }

  Cargararticulos(texto: any, tipo : any, plazas : any, preciomin :any , preciomax :any , gmax: any, gmin : any){
    this.blockUI.start("Cargando artículos...")
    this.search.Obtenerarticulos(texto,tipo,plazas,preciomin,preciomax,gmax,gmin).subscribe(Data=>{
       this.DataArticulos  = Data
       this.items=[];
       for(var i = 0 ; i< this.DataArticulos.length ; i++){
         this.items.push({
           Nombre: this.DataArticulos[i]['Descripcion'],
           Upc :this.DataArticulos[i]['UPC'],
           Sucursal:this.DataArticulos[i]['NombreSucursal'],
           Marca:this.DataArticulos[i]['Marca'],
           Precio:this.DataArticulos[i]['Precio'],
           PrecioNeto:this.DataArticulos[i]['PrecioNeto'],
           Observaciones:this.DataArticulos[i]['Observaciones']
         })
       }
       this.imgArticulo="";
       this.DesArticulo="";
       this.Precio = "";
       this.PrecioNeto = "";
       this.Sucursal = "";
       this.Upc = "";
       this.blockUI.stop();
    });
  }
  Cargartexto(texto : any){
   this.Cargararticulos(texto,"51","01","","","","");
  }
  onSubmit(){

    var mxl = (<HTMLInputElement>document.getElementById("mxl")).checked;
    var cln = (<HTMLInputElement>document.getElementById("cln")).checked;
    var tj =  (<HTMLInputElement>document.getElementById("tj")).checked;
    var gdl =  (<HTMLInputElement>document.getElementById("gdl")).checked;
    var hmo =  (<HTMLInputElement>document.getElementById("hmo")).checked;
    var mzt =  (<HTMLInputElement>document.getElementById("mzt")).checked;
    var txt = (<HTMLInputElement>document.getElementById("texto")).value;

    var Varios = (<HTMLInputElement>document.getElementById("Varios")).checked;
    var pricemax = (<HTMLInputElement>document.getElementById("pricemax")).value;
    var pricemin = (<HTMLInputElement>document.getElementById("pricemin")).value;


    let plazas = '';
    let tipo = '';
    if (cln) {plazas += "01, ";}

		if (gdl) {plazas += "05, ";}

		if (hmo) {plazas += "02, ";}

		if (mzt) {plazas += "04, ";}

		if (tj) {plazas += "03, ";}

		if (mxl) {plazas += "07, ";}

    if(!cln && !gdl && !hmo && !mzt && !tj && !mxl){plazas="01, 02, 03, 04, 05 , 07 "}

    if(Varios){
        tipo = "51";
    }else{
       tipo = "1"
    }

    if (plazas.length > 0) {plazas = plazas.substring(0, plazas.length - 2);}

    this.Cargararticulos(txt,tipo,plazas,pricemax,pricemin,"","");


  }
  getData(data : any ){
    console.log(data);

    this.imgArticulo="https://consola.maxilana.com/images/remates/"+data.Upc+".jpg";
    this.DesArticulo=data.Nombre + " " + data.Marca;
    this.Precio = data.Precio; 
    this.PrecioNeto = data.PrecioNeto;
    this.Sucursal = data.Sucursal;
    this.Upc = data.Upc;
    console.log(this.imgArticulo)

  }
  change(data : any){
    console.log(data);


    if(data == 1){
      (<HTMLInputElement>document.getElementById("Joyeria")).checked = false;
    }
    if(data == 2){
      (<HTMLInputElement>document.getElementById("Varios")).checked = false;
    }
    var Varios = (<HTMLInputElement>document.getElementById("Varios")).checked;
    var Joyeria = (<HTMLInputElement>document.getElementById("Joyeria")).checked;

    console.log(Varios);
    console.log(Joyeria);
  }
}
