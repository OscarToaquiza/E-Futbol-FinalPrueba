import { Component, OnInit } from '@angular/core';
import { TemporadaService } from '../../services/temporada.service';
import { GLOBAL } from '../../services/global';

import {BrowserModule, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'
import { Temporada } from '../../models/temporada.models';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styleUrls: ['./reglamento.component.css']
})
export class ReglamentoComponent implements OnInit {

  public temporada_actual: Temporada;
  public url: string;
  public pdf: any;
  public pdfIframe :SafeResourceUrl;

  constructor(private _temporadaService: TemporadaService,private domSanitizer:DomSanitizer) {
    this.url = GLOBAL.url;
    this.temporada_actual = JSON.parse(localStorage.getItem('Temporada_Actual'));
   }

  ngOnInit() {
    this.obtenerTemporadas();
    console.log('La Temporada Actual es:');
    console.log(JSON.parse(localStorage.getItem('Temporada_Actual')));
  }

  obtenerTemporadas() {
    // this._temporadaService.getTemporadas().subscribe(
      // response => {
        // if (!response) {
        
        // } else {
          // response.forEach(element => {
            // if(element.estado_temporada){
              // this.temporada_actual = element;
              if(this.temporada_actual.url_reglamento_temporada == undefined){
                this.pdf = this.url + "temporada/get-pdf-temporada/REGLAMENTO.pdf";
                this.pdfIframe= this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdf);
              }else{
                this.pdf = this.url + "temporada/get-pdf-temporada/" + this.temporada_actual.url_reglamento_temporada;
                this.pdfIframe= this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdf);
              }    
            // }
          // });
        // }
      // },
      // error => {
        // var errorMessage = <any>error;
        // if (errorMessage != null) {
          // var body = JSON.parse(error._body);
          // console.log(body);
        // }
      // }
    // );
  }
}
