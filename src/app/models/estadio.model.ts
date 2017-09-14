export class Estadio {
    constructor(
        public _id: string,
        public nombre_estadio: string,
        public imagen_estadio: string,
        public ruta_estadio: string,
        public direccion_estadio: string,
        public observacion_estadio: string,
        public estado_estadio: boolean
    ) { }
}
