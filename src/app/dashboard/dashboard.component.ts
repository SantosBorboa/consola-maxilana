import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { InicioService } from 'services/inicio.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  public dataArticulos : any = [];
  public remates : any = 0;
  public vtalinea : any = 0;
  public catalogo : any = 0;

  public itemsvtas : any=[];

  public itemsboletas : any=[];
  constructor(private _inicio : InicioService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  obtenerArticulos(){
    let linea : any = [];
    let catalogo: any = [];
    this.blockUI.start('Cargando información...');
    this._inicio.GetArticulos().subscribe(data =>{
      this.dataArticulos = data;
      for(var i = 0 ; i < this.dataArticulos.length;i++){
          if(this.dataArticulos[i].ventalinea=='1'){
            linea.push(1);
          }else{
            catalogo.push(1);
          }
      }
      this.remates = this.dataArticulos.length;
      this.vtalinea = linea.length;
      this.catalogo = catalogo.length;
      this.blockUI.stop();
    })
  }

  obtenerresumen(){
 
    let arr : any =[];
    let arrBoletas :any =[];
    let arrVtas :any =[];
    this._inicio.resumenpagos().subscribe(data =>{
      arr = data;
      this.itemsvtas = arr.Ventas;
      this.itemsboletas = arr.Boletas;
    });

  }

  ngOnInit() {  
      //this.obtenerArticulos();
      //this.obtenerresumen();

   
  }

}
