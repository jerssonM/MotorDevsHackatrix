import IRouteDetail from './IRouteDetail';

export default interface IStationDetail {
    idEstacion: number;
    nombreEstacion: string;
    totalSolicitudes: number;
    rutas: IRouteDetail[];
}
