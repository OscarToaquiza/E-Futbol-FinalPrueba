export class Categoria{
    constructor(
      public _id: string,
      public nombre_categoria:string,
      public n_equipos_categoria:number,
      public observacion_categoria:string,
      public id_temporada:string,      
      public segunda_vuelta:boolean,
      public codigo_equipo:[string],      
    ){}
  }
