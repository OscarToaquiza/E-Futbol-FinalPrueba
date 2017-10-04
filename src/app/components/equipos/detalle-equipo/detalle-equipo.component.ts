import { element } from 'protractor';
import { GLOBAL } from './../../../services/global';
import { Component, OnInit } from '@angular/core';
import{EquipoService} from '../../../services/equipo.service';
import { TemporadaService } from '../../../services/temporada.service';
import{UserService} from '../../../services/user.service';
import { Temporada } from '../../../models/temporada.models';
import * as _ from 'lodash';
import * as jsPDF from  'jspdf'
import * as $ from 'jquery';
import * as html2canvas from 'html2canvas'
import * as moment from 'moment'
@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {
  edicion_equipo:any
  public url:any;
  public nAux:any;
  public temporada_actual: Temporada;
  public personalEquipo:any;
  public escudo:any;  
  public  imgPDFI=new Array();
  public escu:any; 
  public identity;
  constructor(private _temporadaService: TemporadaService,private _US:UserService) { 
    this.obtenerTemporadas();
    this.url = GLOBAL.url;  
    this.identity = this._US.getIdentity();    
  }

  ngOnInit() {
       
    this.obtenerTemporadas();    
    this.edicion_equipo=JSON.parse(localStorage.getItem('equipoSeleccionado')); 
    console.log(this.edicion_equipo._id);
    $('#escu').attr('crossOrigin', 'anonymous');   
    $('#escu').attr('src',this.url+'equipo/imagen/'+this.edicion_equipo.escudo_equipo);           
    this.escudo=this.getBase64Image(document.getElementById("escu"));    
    this.personalEquipo=this.edicion_equipo.personal_equipo;       
    this.personalEquipo.forEach((element,i) => {            
      var img=new Image();

      if(element.url_foto_personal!=undefined)
      { 
        $('#ju'+(i)).attr('crossOrigin', 'anonymous');
        $('#ju'+(i)).attr('src',this.url+'personal/imagen/'+element.url_foto_personal); 
        // element.url_foto_personal=this.getBase64Image(document.getElementById('ju'+(i+1)));                                      

      }else{
        $('#ju'+(i)).attr('crossOrigin', 'anonymous');
        $('#ju'+(i)).attr('src','assets/img/noticia-default.png');        
      }   
      this.personalEquipo[i].url_foto_personal=this.getBase64Image(document.getElementById('ju'+(i)));                                      
    });
    this.personalEquipo.forEach((element,i) => {
      console.log("##");
      console.log(element);

        // $('#ju'+(i+1)).attr('src',this.url+'personal/imagen/'+element.url_foto_personal); 
        

             
    });
    this.personalEquipo=_.values(_.chunk(this.personalEquipo,6)); 
        
    
    
    // console.log(this.personalEquipo[0][0]);        
  // console.log("Topais");
  // console.log(this.personalEquipo);
    // console.log(this.edicion_equipo.nombre_equipo);    
  }

  descargarCarnets(){
    console.log("!!");
    console.log(this.personalEquipo);        
    this.pdf();
    // let doc=this.pdf(nHojas);    
  }

  pdf(){
      var doc = new jsPDF();
      // doc.addImage(,'JPEG',20,20);
            
    this.personalEquipo.forEach((jugador,i) => {             
        // FILA 1 
        console.log("::::::"+(i*6));              
        if(jugador[0]!=undefined){ 
                 
          var nacimiento=moment(jugador[0].fecha_nacimiento_personal).format('YYYY');
          var hoy=moment().format('YYYY');
          console.log('hoy:'+hoy);
          console.log('nac:'+nacimiento);
          var anios=parseInt(hoy)-parseInt(nacimiento);
          console.log(anios);
          // var nacimiento=moment(jugador[0].fecha_nacimiento_personal);
          // var hoy=moment();
          // var anios=hoy.diff(nacimiento,"years");
          // console.log(anios);
          if(anios<18)        
            doc.addImage($('#formatoCarnet2')[0],'PNG',10,10,90,70);                 
          else 
            doc.addImage($('#formatoCarnet')[0],'PNG',10,10,90,70);                           
          // ESCUDO Y FOTO
          doc.addImage($('#ju'+(i*6+0))[0],'PNG',13,28,22,28);
          doc.addImage($('#escu')[0],'PNG',78,30,20,20);                 
          doc.setFontSize(9);          
          doc.text(this.temporada_actual.nombre_temporada,25,15);          
          doc.text("COTOPAXI - ECUADOR",37,18);                    
          doc.setFontSize(10);
          doc.text(this.edicion_equipo.nombre_equipo,37,30);
          doc.text(jugador[0].apellido_personal,37,39);
          doc.text(jugador[0].nombre_personal,37,43);          
          doc.text(jugador[0].cedula_personal,37,47);
        }        

        if(jugador[1]!=undefined){
          var nacimiento=moment(jugador[1].fecha_nacimiento_personal).format('YYYY');
          var hoy=moment().format('YYYY');
          var anios=parseInt(hoy)-parseInt(nacimiento);
          console.log(anios);
          // var nacimiento=moment(jugador[1].fecha_nacimiento_personal);
          // var hoy=moment();
          // var anios=hoy.diff(nacimiento,"years");
          // console.log(anios);
          if(anios<18)        
            doc.addImage($('#formatoCarnet2')[0],'PNG',110,10,90,70);
          else 
            doc.addImage($('#formatoCarnet')[0],'PNG',110,10,90,70);        
        // ESCUDO Y FOTO
        doc.addImage($('#ju'+(i*6+1))[0],'PNG',13+100,28,22,28);
        doc.addImage($('#escu')[0],'PNG',78+100,30,20,20);                 
        doc.setFontSize(9);          
        doc.text(this.temporada_actual.nombre_temporada,25+100,15);          
        doc.text("COTOPAXI - ECUADOR",37+100,18);                    
        doc.setFontSize(10);
        doc.text(this.edicion_equipo.nombre_equipo,37+100,30);
        doc.text(jugador[1].apellido_personal,37+100,39);
        doc.text(jugador[1].nombre_personal,37+100,43);
        doc.text(jugador[1].cedula_personal,37+100,47);
        }
        // FILA 2 

        if(jugador[2]!=undefined){
          var nacimiento=moment(jugador[2].fecha_nacimiento_personal).format('YYYY');
          var hoy=moment().format('YYYY');
          var anios=parseInt(hoy)-parseInt(nacimiento);
          console.log(anios);
          // var nacimiento=moment(jugador[2].fecha_nacimiento_personal);
          // var hoy=moment();
          // var anios=hoy.diff(nacimiento,"years");
          // console.log(anios);
          if(anios<18)        
            doc.addImage($('#formatoCarnet2')[0],'PNG',10,90,90,70); 
          else 
            doc.addImage($('#formatoCarnet')[0],'PNG',10,90,90,70);           
          // ESCUDO Y FOTO
          doc.addImage($('#ju'+(i*6+2))[0],'PNG',13,28+80,22,28);
          doc.addImage($('#escu')[0],'PNG',78,30+80,20,20);                 
          doc.setFontSize(9);          
          doc.text(this.temporada_actual.nombre_temporada,25,15+80);          
          doc.text("COTOPAXI - ECUADOR",37,18+80);                    
          doc.setFontSize(10);
          doc.text(this.edicion_equipo.nombre_equipo,37,30+80);
          doc.text(jugador[2].apellido_personal,37,39+80);
          doc.text(jugador[2].nombre_personal,37,43+80);
          doc.text(jugador[2].cedula_personal,37,47+80);
        }      
        if(jugador[3]!=undefined){
          var nacimiento=moment(jugador[3].fecha_nacimiento_personal).format('YYYY');
          var hoy=moment().format('YYYY');
          var anios=parseInt(hoy)-parseInt(nacimiento);
          console.log(anios);
          // var nacimiento=moment(jugador[3].fecha_nacimiento_personal);
          // var hoy=moment();
          // var anios=hoy.diff(nacimiento,"years");
          // console.log(anios);
          if(anios<18)        
            doc.addImage($('#formatoCarnet2')[0],'PNG',110,90,90,70);
          else 
            doc.addImage($('#formatoCarnet')[0],'PNG',110,90,90,70);          
                    // ESCUDO Y FOTO
        doc.addImage($('#ju'+(i*6+3))[0],'PNG',13+100,28+80,22,28);
        doc.addImage($('#escu')[0],'PNG',78+100,30+80,20,20);                 
        doc.setFontSize(9);          
        doc.text(this.temporada_actual.nombre_temporada,25+100,15+80);          
        doc.text("COTOPAXI - ECUADOR",37+100,18+80);                    
        doc.setFontSize(10);
        doc.text(this.edicion_equipo.nombre_equipo,37+100,30+80);
        doc.text(jugador[3].apellido_personal,37+100,39+80);
        doc.text(jugador[3].nombre_personal,37+100,43+80);
        doc.text(jugador[3].cedula_personal,37+100,47+80);
        }

        // FILA 3

        if(jugador[4]!=undefined){
          var nacimiento=moment(jugador[4].fecha_nacimiento_personal).format('YYYY');
          var hoy=moment().format('YYYY');
          var anios=parseInt(hoy)-parseInt(nacimiento);
          console.log(anios);
          // var nacimiento=moment(jugador[4].fecha_nacimiento_personal);
          // var hoy=moment();
          // var anios=hoy.diff(nacimiento,"years");
          // console.log(anios);
          if(anios<18)        
            doc.addImage($('#formatoCarnet2')[0],'PNG',10,170,90,70);
          else 
            doc.addImage($('#formatoCarnet')[0],'PNG',10,170,90,70);             
          // ESCUDO Y FOTO          
          doc.addImage($('#ju'+(i*6+4))[0],'PNG',13,28+160,22,28);
          doc.addImage($('#escu')[0],'PNG',78,30+160,20,20);                 
          doc.setFontSize(9);          
          doc.text(this.temporada_actual.nombre_temporada,25,15+160);          
          doc.text("COTOPAXI - ECUADOR",37,18+160);                    
          doc.setFontSize(10);
          doc.text(this.edicion_equipo.nombre_equipo,37,30+160);
          doc.text(jugador[4].apellido_personal,37,39+160);
          doc.text(jugador[4].nombre_personal,37,43+160);
          doc.text(jugador[4].cedula_personal,37,47+160);    
        }
        if(jugador[5]!=undefined){
          var nacimiento=moment(jugador[5].fecha_nacimiento_personal).format('YYYY');
          var hoy=moment().format('YYYY');
          var anios=parseInt(hoy)-parseInt(nacimiento);
          console.log(anios);
          // var nacimiento=moment(jugador[5].fecha_nacimiento_personal);
          // var hoy=moment();
          // var anios=hoy.diff(nacimiento,"years");
          // console.log(anios);
          if(anios<18)        
            doc.addImage($('#formatoCarnet2')[0],'PNG',110,170,90,70);
          else 
            doc.addImage($('#formatoCarnet')[0],'PNG',110,170,90,70);          
                    // ESCUDO Y FOTO
        doc.addImage($('#ju'+(i*6+5))[0],'PNG',13+100,28+160,22,28);
        doc.addImage($('#escu')[0],'PNG',78+100,30+160,20,20);                 
        doc.setFontSize(9);          
        doc.text(this.temporada_actual.nombre_temporada,25+100,15+160);          
        doc.text("COTOPAXI - ECUADOR",37+100,18+160);                    
        doc.setFontSize(10);
        doc.text(this.edicion_equipo.nombre_equipo,37+100,30+160);
        doc.text(jugador[5].apellido_personal,37+100,39+160);
        doc.text(jugador[5].nombre_personal,37+100,43+160);
        doc.text(jugador[5].cedula_personal,37+100,47+160);
        }

        doc.addPage();
      
    });
            doc.save("file.pdf");               
  }
  // pdf(n){
  //   let ctx=this;
  //   this.toCANVAS((img)=>{
  //     var doc = new jsPDF('p', 'mm');
  //     console.log(n);
  //     for (var index = 0; index <=ctx.nAux; index++) { 
  //       console.log("iter");
  //       console.log(img[index]); 
  //       doc.addImage(img[index],'JPEG',20,20);                   
  //       doc.addPage();
  //       doc.save("file.pdf");
  //     }  
  //   });
    
                          
                                

  // }  

  // toCANVAS(callback){    
  //   let ctx=this;
    
      
  //   for (var index = 0; index <= ctx.nAux; index++) {                  
  //         html2canvas($('#carnets'+index)[0]).then(function(canvas) {            
  //             console.log(":D");              
  //             ctx.imgPDFI.push(canvas.toDataURL("image/png"));
  //             console.log(ctx.imgPDFI);              
  //             // console.log($(canvas));
  //             // for (var index = 0; index <= n; index++) {                                
  //             //   doc.addPage();        
  //             //   doc.addImage(img,'JPEG',20,20); 
  //             //   doc.save('file.pdf');
  //             // }                                             
  //         }); 
  //         console.log("Ta grave :( ");
  //         console.log(index+":/"+ctx.nAux);
  //         if(index>ctx.nAux)
  //         {
  //           console.log(":/:(");
  //           console.log(ctx.imgPDFI);
  //           callback(ctx.imgPDFI);
  //         }
  //       }
  // }
  obtenerTemporadas() {
    this._temporadaService.getTemporadas().subscribe(
      response => {
        if (!response) {
          // this.validarTemporadas = false;
        } else {
          response.forEach(element => {
            console.log("qqqqq");
            console.log(element);
            if ( element.estado_temporada ) {
              this.temporada_actual = element;
              console.log("eeeeee");
              console.log(this.temporada_actual);              
            }
          });         
              
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(body);
        }
      }
    );
  }

  getBase64Image(img) {
    if(img!=undefined){           
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = $(canvas).get(0).toDataURL();
      return dataURL;
    }else{
      return null;
    }    
  }
  
    
  
}
