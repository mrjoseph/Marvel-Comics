import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import useStyles from './styles';
export const Loader = () => {
    const classes = useStyles();
    return (<Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={1} justify="center">
            <CircularProgress color="secondary" />
        </Grid>
    </Container>);
};
