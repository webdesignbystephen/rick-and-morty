import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Locations from './routes/Locations/Locations';
import Character from './routes/Character/Character';
import NotFound from './routes/NotFound/NotFound';

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
