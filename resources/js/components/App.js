import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import CreateEmployee from './employee/CreateEmployee'
import CreateTargeted from './targeted/CreateTargeted'
import FormStructuresIndex from './formStructure/FormStructuresIndex'
import FormsIndex from './form/FormsIndex'
import FormStructureCreate from './formStructure/FormStructuresCreate'
import CreateCoach from './coach/CreateCoach'
import CreateProgram from './program/CreateProgram'
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/react' component={Dashboard} />
                        <Route exact path='/react/createEmployeeForm' component={CreateEmployee} />
                        <Route exact path='/react/createTargetedForm' component={CreateTargeted} />
                        <Route exact path='/react/structureIndex' component={FormStructuresIndex} />
                        <Route exact path='/react/formIndex' component={FormsIndex} />
                        <Route exact path='/react/structureCreate' component={FormStructureCreate} />
                        <Route exact path='/react/coachCreate' component={CreateCoach} />
                        <Route exact path='/react/programCreate' component={CreateProgram} />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))