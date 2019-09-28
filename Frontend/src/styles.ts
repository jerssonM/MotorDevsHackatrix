import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
    createStyles({
        background: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundImage:
                'url(' + require('./assets/transmilenio-map.jpg') + ')',
            filter: 'blur(8px)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            zIndex: -1,
            transform: 'scale(1.1)'
        },
        mainContainer: {
            margin: theme.spacing(4)
        }
    });
