export class User{
    constructor(
      public _id: string,
      public nombre:string,
      public apellido:string,
      public cedula:string,
      public email:string,
      public password:string,
      public image:string,
      public fNacimiento:string,
      public genero:string
    ){}
  }
  