export class Noticia{
    constructor(
      public _id: string,
      public titulo:string,
      public descripcion:string,
      public observacion:string,
      public fecha_publicado:string,      
      public image:string,
      public usuario:string,
      public estado_noticia:boolean
    ){}
  }
  