/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import SignIngPage from 'containers/SignIngPage'
import GlobalStyle from '../../global-styles';
import Layout from 'containers/Layout';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;


function App() {
    

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - BayimSu"
        defaultTitle="Bayimsu App
        "
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
     
      <Switch>
        <Route exact path="/login" component={SignIngPage} />
        <Route path="/" component={Layout}/>
  
      </Switch>
 
      <GlobalStyle />
    </AppWrapper>
  );
}
export default hot(App);
