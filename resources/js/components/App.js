import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './utility/routesEndpoints'
import Dashboard from './Dashboard'
import CreateEmployee from './employee/CreateEmployee'
import CreateTargeted from './targeted/CreateTargeted'
import FormStructuresIndex from './formStructure/FormStructuresIndex'
import FormStructureShow from './formStructure/FormStructureShow'
import FormsIndex from './form/FormsIndex'
import FormView from './form/FormView'
import FormStructureCreate from './formStructure/FormStructuresCreate'
import CreateCoach from './coach/CreateCoach'
import CreateProgram from './program/CreateProgram'
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path={routes.createEmployeeForm} component={CreateEmployee} />
                        <Route exact path={routes.createTargetedForm} component={CreateTargeted} />
                        <Route exact path={routes.showFormsStructures} component={FormStructuresIndex} />
                        <Route exact path={routes.showFormStructure+':id'} component={FormStructureShow} />
                        <Route exact path={routes.showForms} component={FormsIndex} />
                        <Route exact path={routes.showForm} component={FormView} />

                        <Route exact path={routes.createFormStructureForm} component={FormStructureCreate} />
                        <Route exact path={routes.createCoachForm} component={CreateCoach} />
                        <Route exact path={routes.createProgramForm} component={CreateProgram} />
                        <Route exact path={routes.dashboard} component={Dashboard} />
                        <Route exact path='/' component={Dashboard} />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))