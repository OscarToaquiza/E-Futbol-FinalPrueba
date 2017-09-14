export class Equipo {
    constructor(
        public _id:String,
        public nombre_equipo: string,
        public descripcion_equipo: string,
        public anio_fundacion_equipo: Number,
        public escudo_equipo: string,
        public color_principal_equipo: string,
        public color_secundario_equipo: string,
        public observacion_equipo: string,
        public personal_equipo: [string],
        public estado_equipo: boolean,
        public logros_equipo: [object]
    ) { }
}

