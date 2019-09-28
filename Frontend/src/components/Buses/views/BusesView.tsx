import { BusesViewProps } from "../interfaces";
import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    MenuItem,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
const BusesView: React.FunctionComponent<BusesViewProps> = ({
    activeBuses,
    busesAvalible,
    handleChangeValue,
    handleNewBus,
    routes,
    newBus
}) => (
    <Card>
        <CardHeader
            title={<Typography variant="h5">Asignar Vehículo</Typography>}
        />
        <CardContent>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Card>
                        <CardContent>
                            <Grid
                                alignItems="center"
                                container
                                justify="space-between"
                                spacing={2}
                            >
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Vehículo"
                                        onChange={handleChangeValue}
                                        name="idBus"
                                        value={newBus.idBus}
                                    >
                                        {busesAvalible.map(
                                            ({ codigo, idBus }) => (
                                                <MenuItem
                                                    key={idBus}
                                                    value={idBus}
                                                >
                                                    {codigo}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Ruta"
                                        onChange={handleChangeValue}
                                        name="idRuta"
                                        value={newBus.idRuta}
                                    >
                                        {routes.map(route => (
                                            <MenuItem key={route} value={route}>
                                                {route}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={2}>
                                    <Button
                                        disabled={
                                            !newBus.idRuta || !newBus.idBus
                                        }
                                        color="primary"
                                        onClick={handleNewBus}
                                        variant="contained"
                                    >
                                        Agregar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={12}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant="h5">
                                    Vehículos en ruta
                                </Typography>
                            }
                        />
                        <CardContent>
                            <List>
                                {activeBuses.map(
                                    ({ codigo, idBus, idRuta }) => (
                                        <ListItem button divider key={idBus}>
                                            <ListItemText>
                                                <Box
                                                    display="inline"
                                                    fontWeight="bold"
                                                >
                                                    Vehículo:
                                                </Box>
                                                {` ${codigo} - `}
                                                <Box
                                                    display="inline"
                                                    fontWeight="bold"
                                                >
                                                    Ruta:
                                                </Box>
                                                {` ${idRuta}`}
                                            </ListItemText>
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default BusesView;
