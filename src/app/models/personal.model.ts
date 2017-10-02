export class Personal {
    constructor(
        public _id: string,        
        public nombre_personal:String, 
        public apellido_personal:String, 
        public rol_personal:String, 
        public fecha_nacimiento_personal:Date, 
        public cedula_personal:String, 
        public goles_personal:Number,
        public TA_personal:Number,
        public TR_personal:Number,
        public sancion_personal:String [],
        public observacion_personal:String,
        public url_foto_personal:String,
        public estado_personal:Boolean
    ) { }
}

