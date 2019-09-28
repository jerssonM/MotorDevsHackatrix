import React, { FunctionComponent } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Typography,
    withStyles
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import IStationsViewProps from '../interfaces';
import styles from './styles';
import IRouteDetail from '../../../models/station/entities/IRouteDetail';

const StationsView: FunctionComponent<IStationsViewProps> = ({
    classes,
    stationDetails
}) => (
    <Card className={classes.card} elevation={2}>
        <CardHeader title={<Typography variant="h6">Estaciones</Typography>} />
        <Divider />
        <CardContent>
            {stationDetails.map(stationDetail => (
                <div>
                    <Box display="inline-block" marginRight="0.25rem">
                        <Typography variant="subtitle1">
                            {stationDetail.nombreEstacion}
                        </Typography>
                    </Box>
                    <Box display="inline-block">
                        <Chip
                            color="secondary"
                            icon={<PersonIcon />}
                            label={stationDetail.totalSolicitudes}
                            size="small"
                        />
                    </Box>
                    <Box margin="0.5rem 0">
                        {stationDetail.rutas.map((ruta: IRouteDetail) => (
                            <Box display="inline-block" margin="0.25rem">
                                <Chip
                                    color="primary"
                                    icon={<PersonIcon />}
                                    label={
                                        ruta.cantidad +
                                        ' (' +
                                        ruta.nombreRuta +
                                        ')'
                                    }
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>
                        ))}
                    </Box>
                </div>
            ))}
        </CardContent>
    </Card>
);

export default withStyles(styles)(StationsView);
