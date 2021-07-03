
import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { createStructuredSelector } from 'reselect';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { changeUsername, changePassword, signIn, loadUser, userNotFound} from './actions';
import { makeSelectUsername , makeSelectPassword, makeSelectUser, makeSelectMessage, makeSelectLoading} from './selectors';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import reducer from './reducer';
import saga from './saga';

import { CardMedia, Input } from '@material-ui/core';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import messages from 'containers/HomePage/messages';
import 'react-notifications/lib/notifications.css';
const stateSelector = createStructuredSelector({
    username: makeSelectUsername(),
    password:makeSelectPassword(),
    data: makeSelectUser(),
    message:makeSelectMessage(),
    loading:makeSelectLoading()
  });

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://bayimsu.com/">
       BayimSu  
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const key = 'sigIn';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { data, username, message} = useSelector(stateSelector);
  let history = useHistory();
  let location = useLocation();
 
  const dispatch = useDispatch();
  // Not gonna declare event types here. No need. any is fine
  const onChangeUsername = (evt: any) =>
    dispatch(changeUsername(evt.target.value));

    const onChangePassword = (evt: any) =>
    dispatch(changePassword(evt.target.value));

  const onSubmitForm = (evt?: any) => {
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }

    dispatch(signIn());

    
  };

  

  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos


  }, []);
  return (
    <Container component="main" maxWidth="xs">,
    {localStorage.getItem("userId") && <Redirect to="/home" ></Redirect>}
      <CssBaseline />

      <div className={classes.paper}>
       <Typography component="h1" variant="h5">
        EskiModa Antique Shop
        </Typography>
        {message!='' && <Alert severity="error">{message}</Alert> }
        <form className={classes.form} onSubmit={onSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={username}
            onChange={onChangeUsername}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangePassword}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Giriş Yap
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Şifremi Unuttum
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Hesap Oluştur"}
              </Link>
            </Grid>
          </Grid>
        </form>
 
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}