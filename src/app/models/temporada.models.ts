export class Temporada {
    constructor(
        public _id: string,
        public nombre_temporada: string,
        public fecha_inicio: Date,
        public fecha_fin: Date,
        public url_reglamento_temporada: string,
        public id_usuario: string,
        public estado_temporada: boolean
    ) { }
}