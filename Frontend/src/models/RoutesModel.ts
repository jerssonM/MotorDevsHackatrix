import { firebaseCredentials } from "../constants/credentials";
import FirebaseService from "../utils/firebaseService";
import ObserverManager, { Manager } from "../utils/observerManager";

export default class RoutesModel extends ObserverManager {
    private firebaseService: FirebaseService;

    constructor() {
        super();
        this.firebaseService = new FirebaseService(
            firebaseCredentials,
            "motorDevsRoutes"
        );
    }

    public getRoutes(manager: Manager<any>) {
        return this.manageObserver(
            () => this.firebaseService.getKeys<any>("/Rutas"),
            manager
        );
    }

    public getRoutesBus(manager: Manager<any>, idRuta: string) {
        return this.manageObserver(
            () => this.firebaseService.getOnce(`/Rutas/${idRuta}`),
            manager
        );
    }
}
