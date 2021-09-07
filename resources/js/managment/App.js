import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopMenue from './partials/TopMenue'
import { Provider } from 'react-redux';
import store from './redux/store';

import AllowedRoutes from './routing/AllowedRoutes'

function App() {

    return (
        <BrowserRouter>

            <Provider store={store}>
                <TopMenue />
                <main className="container-fluid">
                    <AllowedRoutes />
                </main>
            </Provider>

        </BrowserRouter>
    )

}

if (document.getElementById('managment'))
    ReactDOM.render(<App />, document.getElementById('managment'))