import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
   //{ path: '/dashboard', title: 'dashboard',  icon: 'dashboard', class: '' },
    { path: '/Pagos', title: 'Pagos',  icon:'paid', class: '' },
   // { path: '/busquedaarticulos', title: 'Busqueda artículos',  icon:'search', class: '' },
   // { path: '/infoclientes', title: 'Información clientes',  icon:'content_paste', class: '' },
   { path: '/Ventas', title: 'Ventas',  icon:'library_books', class: '' },
 //   { path: '/maps', title: 'Tienda en línea',  icon:'location_on', class: '' },
  { path: '/typography', title: 'Comentarios App',  icon:'notifications', class: '' },
//    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
