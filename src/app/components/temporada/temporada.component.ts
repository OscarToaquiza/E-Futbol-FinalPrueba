
import { Component, OnInit } from '@angular/core';
import { Temporada } from '../../models/temporada.models';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.css']
})
export class TemporadaComponent implements OnInit {

  public verElemento = "nueva-temporada";
  public ver_formulario = false;
  public datosFormuladrioEditar : any;
  public id_editar : string;

  constructor() { }

  ngOnInit() {
  }

  onNotifyClicked(data){
    this.verElemento = data.mensaje.ngSwitch;
    this.ver_formulario = data.mensaje.estado;
    console.log(data);
  }
  onNotifyClicked2(data){
    this.ver_formulario = data;
    console.log(data);
  }
  datosTemporadaEditar(data){
    let fecha1 = data.mensaje.componente.fecha_inicio.split('T');
    let fecha2 = data.mensaje.componente.fecha_fin.split('T');
    data.mensaje.componente.fecha_inicio = fecha1[0];
    data.mensaje.componente.fecha_fin = fecha2[0];
    this.datosFormuladrioEditar = data.mensaje.componente;
    this.id_editar = data.mensaje.componente._id;
    console.log(data.mensaje.componente);
    this.verElemento = "editar-temporada";
    this.ver_formulario = true;
  }

}
