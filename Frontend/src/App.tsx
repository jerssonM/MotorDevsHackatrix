import React, { FunctionComponent } from 'react';
import {
    AppBar,
    Box,
    createMuiTheme,
    Grid,
    IconButton,
    MuiThemeProvider,
    Toolbar,
    Typography,
    withStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Stations from './components/Stations';
import styles from './styles';
import Buses from './components/Buses';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c60c30'
        },
        secondary: {
            main: '#ffed00'
        }
    }
});

const App: FunctionComponent<{ classes: any }> = ({ classes }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.background}></div>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        alignItems="center"
                        container
                        justify="space-between"
                        wrap="nowrap"
                    >
                        <Grid item>
                            <Typography variant="h5">
                                Programación de rutas Transmilenio
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid
                                alignItems="center"
                                container
                                spacing={1}
                                wrap="nowrap"
                            >
                                <Grid item>
                                    <Grid
                                        alignItems="center"
                                        container
                                        spacing={1}
                                        wrap="nowrap"
                                    >
                                        <Grid item>{'Bienvenido '}</Grid>
                                        <Grid item>
                                            <Box
                                                fontWeight="bold"
                                                whiteSpace="nowrap"
                                            >
                                                Pepe Bocadillo
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton color="inherit">
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid className={classes.mainContainer} container spacing={4}>
                <Grid item xs={6}>
                    <Stations />
                </Grid>
                <Grid item xs={6}>
                    <Buses />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(App);
