import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopMenue from './partials/TopMenue'
import { Provider } from 'react-redux';
import store from './redux/store';

import AllowedRoutes from './routing/AllowedRoutes'
import NotFound from './routing/NotFound'

function App() {
    
    return (
        <BrowserRouter>

            <Provider store={store}>
                <TopMenue />

                <main className="container">
                    <Switch>
                        <AllowedRoutes />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </Provider>

        </BrowserRouter>
    )

}


ReactDOM.render(<App />, document.getElementById('app'))