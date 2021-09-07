import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import routes from './utility/routesEndpoints';
import NotFound from './NotFound';
import FormCreate from './form/FormCreate';
import Home from './home/Home';
function App() {

    return (
        <BrowserRouter>

            <Provider store={store}>
                <main className="container-fluid">
                    <Switch>
                        <Route
                            exact={true}
                            title={'generatedForm'}
                            path={routes.generatedForm}
                            component={FormCreate}
                        />
                        <Route
                            exact={true}
                            title={'home'}
                            path={routes.home}
                            component={Home}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </Provider>

        </BrowserRouter>
    )

}

if (document.getElementById('website'))
    ReactDOM.render(<App />, document.getElementById('website'))
