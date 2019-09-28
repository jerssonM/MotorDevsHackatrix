export interface BusesViewProps {
    activeBuses: any[];
    busesAvalible: any[];
    handleChangeValue: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    handleNewBus: () => void;
    newBus: any;
    routes: any[];
}
