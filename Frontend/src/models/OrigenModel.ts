import { firebaseCredentials } from "../constants/credentials";
import FirebaseService from "../utils/firebaseService";
import ObserverManager, { Manager } from "../utils/observerManager";

export default class BusesModel extends ObserverManager {
    private firebaseService: FirebaseService;

    constructor() {
        super();
        this.firebaseService = new FirebaseService(
            firebaseCredentials,
            "motorDevsOrigen"
        );
    }

    public removeOrigen(manager: Manager<any>, idStation: string, idUser: string) {
        return this.manageObserver(
            () => this.firebaseService.Delete(`/Origen/${idStation}/${idUser}`),
            manager
        );
    }
}
