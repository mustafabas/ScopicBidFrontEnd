import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import {
  ButtonBase, CircularProgress, Box, Grid, IconButton, Button, Modal, Paper, Typography, ListItemText, Divider, ListItemIcon, TextField, FormControlLabel,
  Container,
} from '@material-ui/core';
import { makeSelectProductDetailData } from './selectors';
import { PUT_UPDATE_SETTING } from 'containers/App/constanst';
const stateSelector = createStructuredSelector({
  productDetail: makeSelectProductDetailData()
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    rootBase: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: 800
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }),
);
export interface Props {
  data: any;

}

export default function SettingPage() {

  const [message, setMessage] = useState("");
  const [maxAmount, setMaxAmount] = useState(0);
  const [updated, setUpdated] = useState(false);

  const classes = useStyles();

  const onSubmitForm = (evt?: any) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
      axios.put(PUT_UPDATE_SETTING + "/" + localStorage.getItem("userId"), {
        amount: maxAmount
      })
        .then(response => {
          console.log(response);
          if (response.data.result) {
            setUpdated(true);
          }
        })
        .catch(function (error) {
          throw error;
        });
    }
  };


  return (
    <article>

      <Helmet>
        <title>BidApp</title>
        <meta
          name="Settings"
          content="BidApp"
        />
      </Helmet>
      <div className={classes.rootBase}>
        <Paper className={classes.paper}>


          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Max Amount
            </Typography>
            {updated == true && <Alert severity="success">Successful! Your maximum bid amount saved.</Alert>}

            <form onSubmit={onSubmitForm}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Amount"
                name="email"
                value={maxAmount}
                onChange={(e: any) => setMaxAmount(e.target.value)}

              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
              </Grid>
            </form>

          </div>

        </Paper>

      </div>
    </article>
  );
}
