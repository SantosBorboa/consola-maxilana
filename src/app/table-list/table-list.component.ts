import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../comentarios.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  items : any;
  constructor(private _Comentarios : ComentariosService) { }

  ngOnInit() {
    this.ConsultarInformacionCliente();
  }

  ConsultarInformacionCliente(): void {
    this._Comentarios.ObtenerComentariosApp().subscribe(data => {
          let response = data;
          this.items = response;
    });
    
    }
}
