import React, { FunctionComponent, useEffect, useState } from 'react';
import StationsView from '../views/StationsView';
import IStationDetail from '../../../models/station/entities/IStationDetail';
import stationDetailsJSON from '../viewControllers/stationDetails.json';
import StationModel from '../../../models/station';

const stationModel = new StationModel();

const StationsVC: FunctionComponent = () => {
    const [stationDetails, setStationsDetails] = useState<IStationDetail[]>(
        stationDetailsJSON
    );

    useEffect(() => {
        loadStationDetails();
    }, []);

    const loadStationDetails = async () => {
        setStationsDetails(await stationModel.GetStationDetails());
    };

    return <StationsView stationDetails={stationDetails} />;
};

export default StationsVC;
