export class Fecha {
  constructor(
    public _id: string,
    public n_fecha: number,
    public estado_fecha: boolean,
    public fecha: Date,
    public hora: string,
    public id_categoria: string,
    public id_estadio: string,
    public id_equipo1: string,
    public goles_equipo1: [string],
    public tarjetas_amarilla_equipo1: [string],
    public tarjetas_roja_equipo1: any[],
    public codigo_sancion_equipo1: string,
    public observacion_equipo1: string,
    public id_equipo2: string,
    public goles_equipo2: [string],
    public tarjetas_amarilla_equipo2: [string],
    public tarjetas_roja_equipo2: [any],
    public codigo_sancion_equipo2: string,
    public observacion_equipo2: string,
    public primera_segunda: number
  ) { }
}