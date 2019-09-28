import { PropsWithChildren } from "react";

import { ConsistentWith } from "@material-ui/types";

export interface ILoaderViewProps {
    state: boolean;
}

export type withStylesProps<T = {}> = PropsWithChildren<
    ConsistentWith<
        PropsWithChildren<T>,
        { classes: Record<string, string> }
    > & { classes: Record<string, string> }
>;
