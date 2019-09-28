import { firebaseCredentials } from "../constants/credentials";
import FirebaseService from "../utils/firebaseService";
import ObserverManager, { Manager } from "../utils/observerManager";

export default class BusesModel extends ObserverManager {
    private firebaseService: FirebaseService;

    constructor() {
        super();
        this.firebaseService = new FirebaseService(
            firebaseCredentials,
            "motorDevsBuses"
        );
    }

    public getBusesAvailable(manager: Manager<any>) {
        return this.manageObserver(
            () => this.firebaseService.get<any>("/BusesDisponibles"),
            manager
        );
    }

    public getActiveBuses(manager: Manager<any>) {
        return this.manageObserver(
            () => this.firebaseService.get<any>("/BusesActivos"),
            manager
        );
    }

    public addActiveBus(bus: any, manager: Manager<any>) {
        return this.manageObserver(
            () => this.firebaseService.Add(`/BusesActivos/${bus.idBus}`, bus),
            manager
        );
    }

    public removeAvalibleBus(idBus: string, manager: Manager<any>) {
        return this.manageObserver(
            () => this.firebaseService.Delete(`/BusesDisponibles/${idBus}`),
            manager
        );
    }
}
