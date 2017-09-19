import { element } from 'protractor';
import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name: 'OrdenVector'
  })

  export class OrdenVector  {
          
      transform(array, args?: string) {
        array.sort((a: any, b: any) => {
            if (a < b) {
              return -1;
            } else if (a > b) {
              return 1;
            } else {
              return 0;
            }
          });
          return array;
      

        // return array.filter(element => {                                               
        //   });        

        // array.forEach((element,i) => {
            //     array[i].nombre_equipo=element.nombre_equipo+':D';
            // }); 
            // return array;
      }
    
}
    
