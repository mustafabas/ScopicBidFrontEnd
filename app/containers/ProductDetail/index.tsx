import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import saga from './saga';
import reducer from './reducer';
import { ButtonBase, CircularProgress, Box, Grid, IconButton, Button, Modal, Paper, Typography, ListItemText, Divider, Checkbox, FormControlLabel } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeSelectProductDetailData } from './selectors';
import { useParams } from 'react-router-dom';
import * as signalR from "@microsoft/signalr";
import { getProductDetail, changeProductId, loadProductDetailData } from './actions';
import { TapAndPlayTwoTone } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
const key = 'productDetail';
import moment from 'moment';
import Countdown from 'react-countdown';
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
    image: {
      width: 250,
      height: 250,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    textDecoritaonNone: {
      textDecoration: 'none'
    },
    button: {
      margin: theme.spacing(1),
    },
    offerBox: {
      paddingLeft: 10,

    },
    bidContainer: {

    },
    active: {
      background: 'green',
      color: '#fff'
    },
    deActive: {

    }
  }),
);
export interface Props {
  data: any;

}

export default function ProductDetailPage() {
  const { productDetail } = useSelector(stateSelector);
  const [loadedData, setLoadedData] = useState(false);
  const [bidCount, setBidCount] = useState(0);
  const [message, setMessage] = useState("");
  const [productBids, setProductBids] = useState([] as any);
  const [hubConnection, setHubConnection] = useState(null);
  const [autoBid, setAutoBid] = useState(false);

  const dispatch = useDispatch();
  let { id } = useParams();
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const classes = useStyles();
  const messagesEndRef = useRef(null)



  const sendServiceMessage=(autoBidPar:boolean)=>{
    if (hubConnection != null) {
      let count = bidCount + 1;
      var messageData: any = {
        userId: localStorage.getItem("userId"), userName: localStorage.getItem("userName"), price: count, expireDate: productDetail.expireDateTime,
        productId: id, AutoBid: autoBidPar
      };
      console.log(messageData,"send mes");

      const message = JSON.stringify(messageData);
      hubConnection.invoke("GroupSendMessage", id, message)
        .catch(function (data) {
          console.log(data);
          alert('cannot connect to the server');
        });

    }
  }
  const sendMessage = (showMessage: boolean) => {

   
    
    if (productBids.length == 0 && productDetail!=null) {
      sendServiceMessage(false);
    }
    else {
      let lastIndex = productBids.length - 1;
      let lastUserId = productBids[lastIndex].userId;
      if (lastUserId != localStorage.getItem("userId")) {
         sendServiceMessage(false);
      }
      else {
        if (showMessage) {
          alert("You bid already highest value.");
        }
      }
    }
  }

  useEffect(() => {

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [productBids]);


  const addToGroup = () => {

    if (hubConnection == null) {

      const hubConnection: any = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:44382/bidhub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

      hubConnection.start().then(a => {
        hubConnection.invoke("AddToGroup", id).catch(err => console.error(err));

      });
      setHubConnection(hubConnection);
    }
  }
  const renderBidButton = () => {
    var date1 = moment(productDetail.expireDateTime);
    let minDifference = date1.diff(moment(), 'seconds');
    if (minDifference > 0) {
      return (
        <div>
          <form onSubmit={onSubmitForm}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Bid Now
            </Button>
          </form>
          <FormControlLabel
            control={
              <Checkbox
                checked={autoBid}
                onChange={handleChange}
                name="AutoBid"
                color="primary"
              />
            }
            label="Auto Bid"
          />
        </div>
      );
    }
    else {
      return (<Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Closed
      </Button>);
    }
  }
  const receiveMessage = () => {
    if (hubConnection != null) {
      hubConnection.on("ReceiveMessage", message => {
        if (message != null) {
          const messageModel = JSON.parse(message);
          console.log(messageModel);
          if (messageModel.responseMessage == null) {
            let data = { userName: messageModel.userName, price: messageModel.price, active: true };
            let newBid = parseInt(data.price);
            setBidCount(newBid);
            setProductBids(oldArray => [...oldArray, data]);
          }
          else {

            alert(messageModel.responseMessage);
          }

        }
      });
    }
  }
  const onSubmitForm = (evt?: any) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
      sendMessage(true);
    }
  };

  useEffect(() => {
    if (autoBid) {
      sendServiceMessage(true);
    }
  }, [bidCount]);

  useEffect(() => {
    if (productDetail != null) {
      let productBidsR = productDetail.productBidResponses;
      if (productBidsR.length > 0 && productBids.length == 0) {
        let lastPrice = productBidsR[productBidsR.length - 1].price;
        setBidCount(lastPrice);
        setProductBids(productDetail.productBidResponses);
      }
    }

    if (productDetail == null) {
      dispatch(changeProductId(id));
      dispatch(loadProductDetailData());
      addToGroup();
 
    }
    receiveMessage();
  }, [productDetail]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoBid(event.target.checked);
    if(event.target.checked){
      sendServiceMessage(true);
    }
  
  };


  return (
    <article>

      <Helmet>
        <title>BidApp</title>
        <meta
          name="Bid app productdetail"
          content="BidApp"
        />
      </Helmet>
      <div className={classes.rootBase}>
        <Grid container spacing={1}>
          {productDetail == null && <CircularProgress />}
          {productDetail != null &&
            <Grid container item xs={12} spacing={3}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src="https://www.antikkutu.com/upload/productsImage/1200x1200/20210428_183001.jpg" />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                          {productDetail.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          ID: {id}
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 600 }} >
                          <Countdown date={moment(productDetail.expireDateTime)} />
                        </Typography>
                      </Grid>
                      <Grid item>
                        {renderBidButton()}

                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">$ {bidCount}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Box display="flex">
                    <Box width="100%">
                      <Typography variant="h5">Product Detail</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {productDetail.description}
                      </Typography>
                    </Box>
                    <Box flexShrink={0} className={classes.offerBox}>
                      <Typography variant="h5">Offers</Typography>
                      <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                        <List  >
                          {productBids != null && productBids.length > 0 && (
                            productBids.map((item: any, index: number) => {
                              return (
                                <div>
                                  <ListItem alignItems="flex-start" className={(index == (productBids.length - 1)) ? classes.active : classes.deActive}>
                                    <ListItemText
                                      primary={"User name:" + item.userName + " Price:" + item.price}
                                    />
                                  </ListItem>
                                  <Divider component="li" />
                                </div>
                              )
                            }))
                          }
                          {productBids.length == 0 && <Alert severity="warning">There is no offer currently</Alert>}
                        </List>
                        <div ref={messagesEndRef} />
                      </Paper>
                    </Box>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          }
          <Grid>
          </Grid>
        </Grid>
      </div>
    </article>
  );
}
