import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './utility/routesEndpoints'
import TopMenue from './partials/TopMenue'
import Dashboard from './Dashboard'
import CreateEmployee from './employee/CreateEmployee'
import EmployeeShow from './employee/EmployeeShow'

import CreateTargeted from './targeted/CreateTargeted'

import FormStructureShow from './formStructure/FormStructureShow'
import FormView from './form/FormView'
import FormCreate from './form/FormCreate'
import FormSearch from './form/FormSearch'

import FormStructureCreate from './formStructure/FormStructuresCreate'
import CreateCoach from './coach/CreateCoach'

import CreateCourse from './course/CourseCreate'
import CreateProgram from './program/CreateProgram'
import JobCreate from './job/JobCreate'
import UnitCreate from './Unit/UnitCreate'

import ConductInterviewAssessment from './assessments/interview/ConductAssessment'
import ConductTrialPeriodAssessment from './assessments/trialPeriod/ConductTrialPeriodAssessment'
import ConductTrainingPeriodAssessment from './assessments/TrainingPeriod/ConductTrainingPeriodAssessment'
import ConductTraineeCourseAssessment from './assessments/course/ConductTraineeCourseAssessment'
import ConductCoachCourseAssessment from './assessments/course/ConductCoachCourseAssessment'

import InterviewAssessmentIndex from './assessments/interview/InterviewAssessmentIndex'
import TrialPeriodAssessmentIndex from './assessments/trialPeriod/TrialPeriodAssessmentIndex'
import CoachCourseAssessmentIndex from './assessments/course/CoachCourseAssessmentIndex'
import TraineeCourseAssessmentIndex from './assessments/course/TraineeCourseAssessmentIndex'
import TrainingPeriodAssessmentIndex from './assessments/trainingPeriod/TrainingPeriodAssessmentIndex'

import FormStructuresIndex from './formStructure/FormStructuresIndex'
import FormsIndex from './form/FormsIndex'
import CoachIndex from './coach/CoachIndex'
import AssessmentsIndex from './assessments/Index'
import ProgramIndex from './program/ProgramIndex'
import CourseIndex from './course/CourseIndex'
import EmployeeIndex from './employee/EmployeeIndex'
import JobIndex from './job/JobIndex'
import UnitIndex from './unit/UnitIndex'

import CourseShow from './course/CourseShow'
import ProgramShow from './program/ProgramShow'
import showJob from './job/JobShow'
import TargetedShow from './targeted/TargetedShow'
import UnitShow from './unit/UnitShow'
import CoachShow from './coach/CoachShow'

import AttendanceManager from './course/AttendancesManager'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <TopMenue />

                <div>
                    <Switch>


                        <Route exact path={routes.showFormStructure + ':id'} component={FormStructureShow} />
                        <Route exact path={routes.showForm} component={FormView} />
                        <Route exact path={routes.generatedForm} component={FormCreate} />
                        <Route exact path={routes.searchForms} component={FormSearch} />

                        <Route exact path={routes.createEmployeeForm} component={CreateEmployee} />
                        <Route exact path={routes.createTargetedForm} component={CreateTargeted} />
                        <Route exact path={routes.createFormStructureForm} component={FormStructureCreate} />
                        <Route exact path={routes.createCoachForm} component={CreateCoach} />
                        <Route exact path={routes.createProgramForm} component={CreateProgram} />
                        <Route exact path={routes.createCourse} component={CreateCourse} />
                        <Route exact path={routes.jobCreate} component={JobCreate} />
                        <Route exact path={routes.unitCreate} component={UnitCreate} />
                        
                        <Route exact path={routes.conductInterviewAssessment} component={ConductInterviewAssessment} />
                        <Route exact path={routes.conductTrialPeriodAssessment} component={ConductTrialPeriodAssessment} />
                        <Route exact path={routes.conductTrainingPeriodAssessment} component={ConductTrainingPeriodAssessment} />
                        <Route exact path={routes.conductTraineeCourseAssessment} component={ConductTraineeCourseAssessment} />
                        <Route exact path={routes.conductCoachCourseAssessment} component={ConductCoachCourseAssessment} />

                        <Route exact path={routes.interviewAssessmentIndex} component={InterviewAssessmentIndex} />
                        <Route exact path={routes.TrialPeriodAssessmentIndex} component={TrialPeriodAssessmentIndex} />
                        <Route exact path={routes.TrainingPeriodAssessmentIndex} component={TrainingPeriodAssessmentIndex} />
                        <Route exact path={routes.CoachCourseAssessmentIndex} component={CoachCourseAssessmentIndex} />
                        <Route exact path={routes.TraineeCourseAssessmentIndex} component={TraineeCourseAssessmentIndex} />

                        <Route exact path={routes.programIndex} component={ProgramIndex} />
                        <Route exact path={routes.AssessmentsIndex} component={AssessmentsIndex} />
                        <Route exact path={routes.CoachesList} component={CoachIndex} />
                        <Route exact path={routes.showForms} component={FormsIndex} />
                        <Route exact path={routes.showFormsStructures} component={FormStructuresIndex} />
                        <Route exact path={routes.courseIndex} component={CourseIndex} />
                        <Route exact path={routes.employeeIndex} component={EmployeeIndex} />
                        <Route exact path={routes.jobIndex} component={JobIndex} />
                        <Route exact path={routes.unitIndex} component={UnitIndex} />
                        
                        <Route exact path={routes.showCourse} component={CourseShow} />
                        <Route exact path={routes.showProgram} component={ProgramShow} />
                        <Route exact path={routes.showJob} component={showJob} />
                        <Route exact path={routes.showTargeted} component={TargetedShow} />
                        <Route exact path={routes.showEmployee} component={EmployeeShow} />
                        <Route exact path={routes.showUnit} component={UnitShow} />
                        <Route exact path={routes.showAttendances} component={AttendanceManager} />
                        <Route exact path={routes.showCoach} component={CoachShow} />


                        <Route exact path={routes.dashboard} component={Dashboard} />
                        <Route exact path='/' component={Dashboard} />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))