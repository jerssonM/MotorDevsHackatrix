import { CircularProgress, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./styles";
import { ILoaderViewProps, withStylesProps } from "../interfaces";

export interface IIndicadorCargaGlobalVistaProps {
    estado: boolean;
}

const LoaderView: React.FunctionComponent<withStylesProps<ILoaderViewProps>> = ({
    classes,
    state
}) => (
    <div className={state ? classes.loader : ""}>
        {state && <CircularProgress />}
    </div>
);

export default withStyles(styles)(LoaderView);
