import firebase from 'firebase';
import { Observer, Observable } from 'rxjs';
import { Subscription } from '../utils/observerManager';
import { firebaseCredentials } from '../constants/credentials';
firebase.initializeApp(firebaseCredentials);
const db = firebase.database();

export default class StationModel {
    public GetStationDetails(): Subscription<any> {
        return Observable.create((observer: Observer<any>) => {
            var database = db.ref('/');
            database.on(
                'value',
                function(snapshot: any) {
                    let datosNodo = snapshot.val();
                    var estaciones = datosNodo.Estaciones; //db.ref("Estaciones");
                    var origenes = datosNodo.Origen; //db.ref("Origen");
                    var destinos = datosNodo.Destino; //db.ref("Destino");
                    var rutas = datosNodo.Rutas; //db.ref("Rutas")
                    let data = [];
                    //origenes.on("value",(snapshot:any)=>{
                    //    destinos.on("value",(snapshot:any)=>{
                    //        rutas.on("value",(snapshot:any)=>{
                    //
                    //        });
                    //    });
                    //});

                    for (let index = 0; index < estaciones.length; index++) {
                        const estacion = estaciones[index];
                        let idEstacionOrigen = estacion.IdEstacion;
                        let numSolicitudesEstacion = 0;
                        let destinosUsuarios: any = {};
                        let usuariosEstacionOrigen = [];
                        let estacionEncontradaEnOrigen = false;

                        for (const idEstacion in origenes) {
                            if (idEstacion == estacion.IdEstacion) {
                                usuariosEstacionOrigen = origenes[idEstacion];
                                numSolicitudesEstacion =
                                    origenes[idEstacion].length;
                                estacionEncontradaEnOrigen = true;
                            }
                        }
                        if (!estacionEncontradaEnOrigen) {
                            continue;
                        }
                        usuariosEstacionOrigen.forEach(
                            (idUsuarioEstacionOrigen: any) => {
                                for (const idEstacion in destinos) {
                                    let usuarios = destinos[idEstacion];
                                    if (
                                        Object.values(usuarios).some(
                                            (usuario: any) =>
                                                usuario.idUsuario ==
                                                idUsuarioEstacionOrigen.idUsuario
                                        )
                                    ) {
                                        let conteo = destinosUsuarios[
                                            idEstacion
                                        ]
                                            ? destinosUsuarios[idEstacion]
                                            : 0;
                                        destinosUsuarios[idEstacion] =
                                            conteo + 1;
                                    }
                                }
                            }
                        );
                        let destinosOrganizados = [];
                        let rutasOrganizadas: any = [];
                        for (const idEstacionDestino in destinosUsuarios) {
                            destinosOrganizados.push({
                                idEstacionDestino: +idEstacionDestino,
                                numeroSolicitudes:
                                    destinosUsuarios[idEstacionDestino]
                            });
                        }
                        for (const idRuta in rutas) {
                            let estacionesRuta = rutas[idRuta];
                            rutasOrganizadas.push({
                                idRuta: idRuta,
                                estaciones: estacionesRuta
                            });
                        }
                        let rutasRecomendadas: any = [];
                        destinosOrganizados
                            .sort((a, b) =>
                                a.numeroSolicitudes < b.numeroSolicitudes
                                    ? 1
                                    : -1
                            )
                            .forEach(destino => {
                                let idEstacionDestino =
                                    destino.idEstacionDestino;
                                let rutaRecomendada = rutasOrganizadas
                                    .sort((a: any, b: any) =>
                                        a.estaciones.length >
                                        b.estaciones.length
                                            ? 1
                                            : -1
                                    )
                                    .find((ruta: any) => {
                                        return (
                                            ruta.estaciones.some(
                                                (estacion: any) =>
                                                    estacion.idEstacion ==
                                                    idEstacionOrigen
                                            ) &&
                                            ruta.estaciones.some(
                                                (estacion: any) =>
                                                    estacion.idEstacion ==
                                                    idEstacionDestino
                                            )
                                        );
                                    });
                                    if (rutaRecomendada != undefined) {

                                        rutasRecomendadas.forEach((ruta: any) => {
                                            if (
                                                ruta.nombreRuta ==
                                                rutaRecomendada.idRuta
                                            ) {
                                                ruta.cantidad =
                                                    ruta.cantidad +
                                                    destino.numeroSolicitudes;
                                            }
                                        });
                                        if (
                                            !rutasRecomendadas.some(
                                                (ruta: any) =>
                                                ruta.nombreRuta ==
                                            rutaRecomendada.idRuta
                                            )
                                ) {
                                    rutasRecomendadas.push({
                                        nombreRuta: rutaRecomendada.idRuta,
                                        cantidad: destino.numeroSolicitudes
                                    });
                                }
                            }
                            });
                        data.push({
                            idEstacion: estacion.IdEstacion,
                            nombreEstacion: estacion.Nombre,
                            rutas: rutasRecomendadas,
                            totalSolicitudes: numSolicitudesEstacion
                        });
                    }

                    observer.next(data);
                },
                function(errorObject: any) {
                    console.log('The read failed: ' + errorObject.code);
                }
            );
        });
    }
}
