import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Locations from './views/Locations/Locations';
import Character from './views/Character/Character';
import NotFound from './views/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path='/locations' component={Locations} />
                <Route path='/character/:id' component={Character} />
                <Redirect from='/' to='locations' exact />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
