import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import FormCreate from './form/FormCreate';
import routes from './utility/routesEndpoints';
import NotFound from './NotFound';

function App() {

    return (
        <BrowserRouter>

            <Provider store={store}>
                <Switch>

                    <Route
                        exact={true}
                        title={'generatedForm'}
                        path={routes.generatedForm}
                        component={FormCreate}
                    />

                    <Route component={NotFound} />

                </Switch>
            </Provider>

        </BrowserRouter>
    )

}

if (document.getElementById('website'))
    ReactDOM.render(<App />, document.getElementById('website'))
