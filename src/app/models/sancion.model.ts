export class Sancion {
    constructor(
        public _id:string,
        public nombre_sancion: String,   
        public estado_sancion:Boolean,
        public pts_sancion:Number,
        public observacion_sancion:String
    ) { }
}