import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Alert } from '@material-ui/lab';
import reducer from './reducer';
import saga from './saga';
import { ButtonBase, CircularProgress, Grid, IconButton, makeStyles, Modal, Paper, Typography, TextField, Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Pagination from '@material-ui/lab/Pagination';
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
  const [loadedData, setLoadedData] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [pageNumbers, setPageNumbers] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const styles = useStyles();


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    {

      if (homeData) {

        const indexOfLastTodo = currentPage * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        let currentProducts:any =[];
   
        if (searchText.length>3) {
           currentProducts = homeData.filter((p: any) => p.name.toLowerCase().includes(searchText.toLowerCase() || p.description.toLowerCase().includes(searchText)));
        }
        else{
          currentProducts=homeData;
        }

        setPageNumbers(Math.ceil(currentProducts.length / perPage));
        currentProducts = currentProducts.slice(indexOfFirstTodo, indexOfLastTodo);
        setProducts(currentProducts);
      }
    }
  }, [currentPage, searchText]);

  useEffect(() => {
    {
      if (loadedData == false) {
        dispatch(loadHomeData());
      }
      if (homeData) {
        setLoadedData(true);
        const indexOfLastTodo = currentPage * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentProducts = homeData.slice(indexOfFirstTodo, indexOfLastTodo);

        setProducts(currentProducts);

        setPageNumbers(Math.ceil(homeData.length / perPage));
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
          <Grid item>

            <div style={{ flex: 1, flexDirection: 'column' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="searchText"
                label="Search min. 3 char."
                name="searchText"
                value={searchText}
                onChange={(e: any) => setSearchText(e.target.value)}
              />

            </div>
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {loadedData==false && <CircularProgress align-item="center"></CircularProgress>}
            {products != null && products.length > 0 && (
              products.map((item: any) => {
                return (
                  <ProductItem data={item} ></ProductItem>
                )
              }))
            }
          {searchText!='' && products.length==0  && <Alert severity="info">"{searchText}" couldn't find. Try with another words</Alert>}
          </Grid>
          <Typography>Current Page: {currentPage}</Typography>
          <Pagination count={pageNumbers} page={currentPage} onChange={handleChange} />
        </Grid>
      </div>
    </article>
  );
}
