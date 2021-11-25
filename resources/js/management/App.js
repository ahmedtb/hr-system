import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TopMenue from './components/TopMenue'
import { Provider } from 'react-redux';
import store from './redux/store';

import AllowedRoutes from './routing/AllowedRoutes'

function App() {

    return (
        <BrowserRouter>

            <Provider store={store}>
                <TopMenue />
                <main className="container">
                    <AllowedRoutes />
                </main>
            </Provider>

        </BrowserRouter>
    )

}

if (document.getElementById('management'))
    ReactDOM.render(<App />, document.getElementById('management'))