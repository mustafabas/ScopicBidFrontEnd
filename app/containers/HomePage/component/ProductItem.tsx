import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import moment from 'moment';
import Countdown from 'react-countdown';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width:'25%'
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
    textDecoritaonNone:{
      color:'#000',
      fontWeight:700
    }
  }),
);
export interface Props {
    data: any;

}


export default function ProductItem(props:Props) {
  const classes = useStyles();
  const item =props.data;

  const renderDate=(item:any)=>{
    
    var date1 = moment(item.expireDateTime);
    let minDifference=date1.diff(moment(), 'minutes');
    if(minDifference>0){
      return (
        <Grid item>
           <Countdown date={date1} />
          <Typography variant="body2" style={{ cursor: 'pointer' }}>
         <a href={"/product/"+item.id} className={classes.textDecoritaonNone}>
          Bid Now
          </a>
        </Typography>
      </Grid>
  
      );
    }
    else{
      return (
        <Grid item>
        <Typography variant="body2" gutterBottom>
          Closed
          </Typography>
      </Grid>
  
      );
    }


  }
  return (
  
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="https://www.antikkutu.com/upload/productsImage/1200x1200/20210428_183001.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 {item.name}
                </Typography>
           
     
                <Typography variant="body2" color="textSecondary">
                  ID: {item.id}
                </Typography>
              </Grid>
              {renderDate(item)}
  
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${item.startPrice}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

  );
}
