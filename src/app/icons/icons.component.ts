import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { PagosService } from 'services/pagos.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  public items: any = [];
  public DataArticulos: any = [];
  @BlockUI() blockUI: NgBlockUI;

  //pagination
  public paginaActual: number = 1
  public anterior: boolean = false
  public siguiente: boolean = true
  public totalPaginas: number = 0
  private totalPorPaginas: number = 150
  private paginado: [] = []
  constructor(private Pays: PagosService) { }

  btnPrimera() {
    this.anterior = false
    this.siguiente = true
    this.paginaActual = 1
    this.items = this.GetPagina(this.paginaActual)
  }
  btnUltima() {
    this.anterior = true
    this.siguiente = false
    this.paginaActual = this.totalPaginas
    this.items = this.GetPagina(this.paginaActual)
  }
  btnSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.anterior = true
      this.paginaActual += 1
    }
    this.siguiente = this.paginaActual == this.totalPaginas?false:true
    this.items = this.GetPagina(this.paginaActual)
  }
  btnAnterior() {
    if (this.paginaActual > 1) { 
      this.siguiente = true
      this.paginaActual -= 1 
    }
    this.anterior = this.paginaActual == 1?false:true
    this.items = this.GetPagina(this.paginaActual)
  }

  showData(event:any) {
    const tr = event.target.parentElement as HTMLTableRowElement;
    const reference = tr.cells[3].innerText;
    const datarow = this.items.filter((el)=>{return el.Referencia == reference})
    if(datarow){
      const el = datarow[0];
      Swal.fire({
        width:1400,
        title: '<strong>Referencia: <u>'+el.Referencia+'</u></strong>',
        icon: 'info',
        html:
          'La información mostrada es referente a la venta realizada por el cliente.' +
          '<br>'+
          '<table class="table table-hover">'+
          '<thead class="text-warning">'+
           '   <th>ID</th>'+
           '  <th>BOLETA</th>'+
           '  <th>RECIBO</th>'+
           '  <th>AUTORIZACION</th>'+
           '   <th>SUCURSAL</th>'+
           '   <th>DIAS PAGADOS</th>'+
           '   <th>TIPO PAGO</th>'+
           '   <th>CANAL DE PAGO</th>' +
           '</thead>'+
           '<tbody>'+
           '<tr>'+
           ' <th>'+el.id+'</th>'+
           '  <th>'+el.Boleta+'</th>'+
           '  <th>'+el.Recibo+'</th>'+
           ' <th>'+el.Control+'</th>'+
           ' <th>'+el.Sucursal+'</th>'+
           ' <th>'+el.Diaspagados+'</th>'+
           ' <th>'+el.Tipopago+'</th>'+
           ' <th>'+el.Canaldepago+'</th>'+
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
    }
  }

  private paginar() {
    this.totalPaginas = Math.ceil(this.DataArticulos.length / this.totalPorPaginas);
    this.siguiente = this.totalPaginas > 1?true:false;
    this.anterior = false;
    let counter = 1;
    let pag = 1;
    this.paginado = this.DataArticulos.map((el) => {
      const o = {
        pagina: pag,
        id: el['id'],
        Boleta: el['boleta'],
        Monto: el['monto'],
        Referencia: el['reference'],
        Control: el['auth_code'],
        Fecha: el['FechaPago'],
        Sucursal: el['codigosucursal'],
        Resultado: el['payw_result'] == "A" ? 'Aprobado' : 'Rechazado',
        Recibo: el['Recibo'],
        tdsecure: "200",
        Correo: el['correoelectronico'],
        Tipopago: el['codigotipopago'] == "1" ? 'Pago de interés' : 'Abono interés',
        Diaspagados: el['diaspagados'],
        Canaldepago: el['pagoapp'] == "0" ? 'Página web' : 'Aplicación',
      }
      counter += 1;
      if (counter == this.totalPorPaginas) {
        pag += 1;
        counter = 0;
      }
      return o;
    })
  }
  GetPagina(pagina: number) {
    return this.paginado.filter((el: any) => { return el.pagina == pagina })
  }
  ngOnInit() {
  }
  onSubmit() {
    this.paginaActual = 1
    this.totalPaginas = 0
    let EsPrestamo = (<HTMLInputElement>document.getElementById("Pyvales")).checked;
    let EsEmpeno = (<HTMLInputElement>document.getElementById("Empenov")).checked;
    let Boleta = (<HTMLInputElement>document.getElementById("Bol")).value;
    let Auth = (<HTMLInputElement>document.getElementById("Auth")).value;
    let Ref = (<HTMLInputElement>document.getElementById("Ref")).value;

    if (Boleta !== "") {
      Auth = "0";
      Ref = "0";
    } else if (Auth !== "") {
      Boleta = "0";
      Ref = "0";
    } else if (Ref !== "") {
      Boleta = "0";
      Auth = "0";
    } else {
      Boleta = "0";
      Auth = "0";
      Ref = "0";
    }

    if (EsPrestamo) {

    } else if (EsEmpeno) {
      this.blockUI.start("Buscando información...")
      this.Pays.ObtenerInfoPagoEmpeno(Boleta, Auth, Ref).then(Data => {
        this.DataArticulos = Data
        this.items = [];
        this.paginar();
        this.items = this.GetPagina(this.paginaActual)
        this.blockUI.stop()
      });
    }
  }
  onSubmitIntentos() {
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


  change(data: any) {
    console.log(data);


    if (data == 1) {
      (<HTMLInputElement>document.getElementById("Pyvales")).checked = false;
      (<HTMLInputElement>document.getElementById("ppyvales")).style.display = "none";
      (<HTMLInputElement>document.getElementById("empeno")).style.display = "flex";
      (<HTMLInputElement>document.getElementById("tableEmpeno")).style.display = "initial";

      (<HTMLInputElement>document.getElementById("tablePP")).style.display = "none";
    }
    if (data == 2) {
      (<HTMLInputElement>document.getElementById("Empenov")).checked = false;
      (<HTMLInputElement>document.getElementById("empeno")).style.display = "none";
      (<HTMLInputElement>document.getElementById("ppyvales")).style.display = "flex";
      (<HTMLInputElement>document.getElementById("tablePP")).style.display = "initial";

      (<HTMLInputElement>document.getElementById("tableEmpeno")).style.display = "none";
    }


  }
  IngresoDatos(data: any) {
    console.log(data);


    if (data == 1) {
      (<HTMLInputElement>document.getElementById("Auth")).value = "";
      (<HTMLInputElement>document.getElementById("Ref")).value = "";
    }
    if (data == 2) {
      (<HTMLInputElement>document.getElementById("Bol")).value = "";
      (<HTMLInputElement>document.getElementById("Ref")).value = "";
    }
    if (data == 3) {
      (<HTMLInputElement>document.getElementById("Bol")).value = "";
      (<HTMLInputElement>document.getElementById("Auth")).value = "";
    }
  }
}
