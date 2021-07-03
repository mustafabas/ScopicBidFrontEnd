import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Alert } from '@material-ui/lab';
import reducer from './reducer';
import saga from './saga';
import { ButtonBase, CircularProgress, Grid, IconButton, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeSelectHomeData, makeSelectLoading, makeSelectNotificationCount } from './selectors';
import { getHomeData, loadHomeData } from './actions';
import CloseIcon from '@material-ui/icons/Close';
import ProductItem from './component/ProductItem';

const key = 'home';

const stateSelector = createStructuredSelector({
  loading: makeSelectLoading(),
  homeData: makeSelectHomeData()
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#fff',

  },
  ordersSuccessContainer: {
    backgroundColor: '#299A0B',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#fff',
  },
  ordersOneTheWayContainer: {
    backgroundColor: '#21B4E2',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#fff',
  },
  ordersWaitingContainer: {
    backgroundColor: '#F8B500',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#fff',
  },
  containerIcon: {
    fontSize: 46,
    alignItems: 'flex-start'
  },
  ordersCancelContainer: {
    backgroundColor: '#CC0000',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#fff',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  modelContainer: {
    width: 1200,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
export default function HomePage() {
  const { homeData, loading } = useSelector(stateSelector);
  console.log(homeData, "homedata came");
  const [loadedData, setLoadedData] = useState(false);

  const dispatch = useDispatch();
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const styles = useStyles();
  useEffect(() => {
    {
      if (loadedData == false) {
        dispatch(loadHomeData());
      }
      if (homeData) {
        setLoadedData(true);
      }
    }
  }, [homeData]);

  return (
    <article>
      <Helmet>
        <title>BidApp</title>
        <meta
          name="description"
          content="BidApp"
        />
      </Helmet>
      <div className={styles.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>

            {homeData != null && (
              homeData.map((item: any) => {
                return (
                  <ProductItem data={item} ></ProductItem>
                )
              }))

            }
          </Grid>
        </Grid>
      </div>
    </article>
  );
}
