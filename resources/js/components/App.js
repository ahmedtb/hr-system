import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './utility/routesEndpoints'
import Dashboard from './Dashboard'
import CreateEmployee from './employee/CreateEmployee'
import EmployeeShow from './employee/EmployeeShow'

import CreateTargeted from './targeted/CreateTargeted'
import TargetedShow from './targeted/TargetedShow'

import FormStructuresIndex from './formStructure/FormStructuresIndex'
import FormStructureShow from './formStructure/FormStructureShow'
import FormsIndex from './form/FormsIndex'
import FormView from './form/FormView'
import FormCreate from './form/FormCreate'
import FormSearch from './form/FormSearch'

import FormStructureCreate from './formStructure/FormStructuresCreate'
import CreateCoach from './coach/CreateCoach'
import CoachIndex from './coach/CoachIndex'

import CreateProgram from './program/CreateProgram'
import ConductInterviewAssessment from './assessments/interview/ConductAssessment'
import ConductTrialPeriodAssessment from './assessments/trialPeriod/ConductAssessment'
import ConductTrainingPeriodAssessment from './assessments/TrainingPeriod/ConductAssessment'
import TraineeCourseAssessment from './assessments/course/TraineeCourseAssessment'
import ConductCoachCourseAssessment from './assessments/course/ConductCoachCourseAssessment'
import AssessmentsIndex from './assessments/Index'

import showCourse from './course/CourseShow'
import showProgram from './program/ProgramShow'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path={routes.createEmployeeForm} component={CreateEmployee} />
                        <Route exact path={routes.showEmployee} component={EmployeeShow} />


                        <Route exact path={routes.createTargetedForm} component={CreateTargeted} />
                        <Route exact path={routes.showTargeted} component={TargetedShow} />


                        <Route exact path={routes.showFormsStructures} component={FormStructuresIndex} />
                        <Route exact path={routes.showFormStructure+':id'} component={FormStructureShow} />
                        <Route exact path={routes.showForms} component={FormsIndex} />
                        <Route exact path={routes.showForm} component={FormView} />
                        <Route exact path={routes.generatedForm} component={FormCreate} />
                        <Route exact path={routes.searchForms} component={FormSearch} />

                        <Route exact path={routes.createFormStructureForm} component={FormStructureCreate} />
                        
                        <Route exact path={routes.createCoachForm} component={CreateCoach} />
                        <Route exact path={routes.CoachesList} component={CoachIndex} />

                        <Route exact path={routes.createProgramForm} component={CreateProgram} />
                        
                        <Route exact path={routes.conductInterviewAssessment} component={ConductInterviewAssessment} />
                        <Route exact path={routes.conductTrialPeriodAssessment} component={ConductTrialPeriodAssessment} />
                        <Route exact path={routes.conductTrainingPeriodAssessment} component={ConductTrainingPeriodAssessment} />
                        <Route exact path={routes.TraineeCourseAssessment} component={TraineeCourseAssessment} />
                        <Route exact path={routes.CoachCourseAssessment} component={ConductCoachCourseAssessment} />
                        <Route exact path={routes.AssessmentsIndex} component={AssessmentsIndex} />

                        <Route exact path={routes.showCourse} component={showCourse} />
                        <Route exact path={routes.showProgram} component={showProgram} />
                        
                        

                        <Route exact path={routes.dashboard} component={Dashboard} />
                        <Route exact path='/' component={Dashboard} />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))