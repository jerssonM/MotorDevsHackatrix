import React, { FunctionComponent, useEffect, useState } from 'react';
import StationsView from '../views/StationsView';
import IStationDetail from '../../../models/IStationDetail';
import StationModel from '../../../models/StationModel';

const stationModel = new StationModel();

const StationsVC: FunctionComponent = () => {
    const [stationDetails, setStationsDetails] = useState<IStationDetail[]>([]);

    useEffect(() => {
        loadStationDetails();
    }, []);

    const loadStationDetails = () => {
        stationModel
            .GetStationDetails()
            .subscribe({ next: data => setStationsDetails(data) });
    };

    return <StationsView stationDetails={stationDetails} />;
};

export default StationsVC;
