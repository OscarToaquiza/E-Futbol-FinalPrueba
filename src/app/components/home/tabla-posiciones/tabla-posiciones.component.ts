import { Component, OnInit } from '@angular/core';
import * as jsPDF from  'jspdf'
import * as $ from 'jquery';
@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.component.html',
  styleUrls: ['./tabla-posiciones.component.css']
})
export class TablaPosicionesComponent implements OnInit {
  public pdf:any;
  
  constructor() {    
   }
  ngOnInit() {
  }  
    a(){
      let doc = new jsPDF()
      
      doc.setFontSize(40)
      doc.fromHTML($('#1')[0],35, 25)       
      this.pdf=doc.output('datauristring');
      // doc.save('file.pdf');     
    }  
    
    b()
    {
      let doc = new jsPDF()
      
      doc.setFontSize(40)
      doc.fromHTML($('#prueba')[0],35, 25)             
      doc.save('file.pdf');     
    }

}
