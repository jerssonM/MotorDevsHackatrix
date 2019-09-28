import React from "react";
import BusesModel from "../../../models/BusesModel";
import RoutesModel from "../../../models/RoutesModel";
import OrigenModel from "../../../models/OrigenModel";
import BusesView from "../views/BusesView";

const busesModel = new BusesModel();
const routesModel = new RoutesModel();
const origenModel = new OrigenModel();

const bus = {
    idBus: "",
    idRuta: ""
};

const BusesViewController: React.FunctionComponent = () => {
    const [activeBuses, setActiveBuses] = React.useState<any[]>([]);
    const [busesAvalible, setBusesAvalible] = React.useState<any[]>([]);
    const [routes, setRoutes] = React.useState<any[]>([]);
    const [newBus, setNewBus] = React.useState(bus);

    React.useEffect(() => {
        getBusesAvalible();
        getRoutes();
        getActiveBuses();
        return () => {
            busesModel.liberateContainer();
            routesModel.liberateContainer();
            origenModel.liberateContainer();
        };
    }, []);

    const handleChangeValue = ({
        target: { name, value }
    }: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
        setNewBus({ ...newBus, [name]: value });
    };

    const getBusesAvalible = () => {
        busesModel.getBusesAvailable({
            next: buses => setBusesAvalible(buses)
        });
    };

    const getActiveBuses = () => {
        busesModel.getActiveBuses({
            next: buses => {
                setActiveBuses(buses);
            }
        });
    };

    const getRoutes = () => {
        routesModel.getRoutes({
            next: routes => setRoutes(routes)
        });
    };

    const handleNewBus = () => {
        busesModel.addActiveBus(
            {
                idBus: Number(newBus.idBus),
                idRuta: newBus.idRuta,
                codigo: busesAvalible.find(
                    ({ idBus }) => idBus === newBus.idBus
                )!.codigo,
                idUltimaEstacion: 0
            },
            { next: e => console.log(e) }
        );
        busesModel.removeAvalibleBus(newBus.idBus, {
            complete: () => setNewBus(bus),
            next: e => console.log(e)
        });
        updateStations(newBus.idRuta);
    };

    const updateStations = (idRoute: string) => {
        routesModel.getRoutesBus(
            {
                next: (routes: any[]) => {
                    debugger
                    routes.forEach(route => {
                        origenModel.removeOrigen(
                            { next: e => console.log(e) },
                            route.idEstacion,
                            "1"
                        );
                    });
                }
            },
            idRoute
        );
    };

    return (
        <BusesView
            activeBuses={activeBuses}
            newBus={newBus}
            busesAvalible={busesAvalible}
            handleChangeValue={handleChangeValue}
            handleNewBus={handleNewBus}
            routes={routes}
        />
    );
};

export default BusesViewController;
