import routes from '../utility/routesEndpoints'
import Roles from './Roles'

// Components
import Dashboard from '../Dashboard'
import CreateEmployee from '../employee/CreateEmployee'
import EmployeeShow from '../employee/EmployeeShow'

import CreateTargeted from '../targeted/CreateTargeted'

import FormStructureShow from '../formStructure/FormStructureShow'
import FormView from '../form/FormView'
import FormCreate from '../form/FormCreate'
import FormSearch from '../form/FormSearch'

import FormStructureCreate from '../formStructure/FormStructuresCreate'
import CreateCoach from '../coach/CreateCoach'

import CreateCourse from '../course/CourseCreate'
import CreateProgram from '../program/CreateProgram'
import JobCreate from '../job/JobCreate'
import UnitCreate from '../Unit/UnitCreate'
import DocumentCreate from '../Document/DocumentCreate'

import ConductInterviewAssessment from '../assessments/interview/ConductInterViewAssessment'
import ConductTrialPeriodAssessment from '../assessments/trialPeriod/ConductTrialPeriodAssessment'
import ConductTrainingPeriodAssessment from '../assessments/TrainingPeriod/ConductTrainingPeriodAssessment'
import ConductTraineeCourseAssessment from '../assessments/course/ConductTraineeCourseAssessment'
import ConductCoachCourseAssessment from '../assessments/course/ConductCoachCourseAssessment'

import InterviewAssessmentIndex from '../assessments/interview/InterviewAssessmentIndex'
import TrialPeriodAssessmentIndex from '../assessments/trialPeriod/TrialPeriodAssessmentIndex'
import CoachCourseAssessmentIndex from '../assessments/course/CoachCourseAssessmentIndex'
import TraineeCourseAssessmentIndex from '../assessments/course/TraineeCourseAssessmentIndex'
import TrainingPeriodAssessmentIndex from '../assessments/trainingPeriod/TrainingPeriodAssessmentIndex'

import FormStructuresIndex from '../formStructure/FormStructuresIndex'
import FormsIndex from '../form/FormsIndex'
import CoachIndex from '../coach/CoachIndex'
// import AssessmentsIndex from '../assessments/Index'
import ProgramIndex from '../program/ProgramIndex'
import CourseIndex from '../course/CourseIndex'
import EmployeeIndex from '../employee/EmployeeIndex'
import JobIndex from '../job/JobIndex'
import UnitIndex from '../unit/UnitIndex'
import IndividualIndex from '../targeted/IndividualIndex'

import CourseShow from '../course/CourseShow'
import ProgramShow from '../program/ProgramShow'
import showJob from '../job/JobShow'
import TargetedShow from '../targeted/TargetedShow'
import UnitShow from '../unit/UnitShow'
import CoachShow from '../coach/CoachShow'
import TrialPeriodAssessmentShow from '../assessments/trialPeriod/TrialPeriodAssessmentShow'
import AttendanceManager from '../course/AttendancesManager'

import CoursesBrowser from '../course/CoursesBrowser'
import LoginPage from '../LoginPage'

// TODO:
/*
* 1. Make title optional
* 2. Make title multi type support ie: (string, node, react element)
* */

export default [
    {
        component: CreateEmployee,
        path: routes.createEmployeeForm,
        title: 'Module - 1',
        exact: true,
    },
    {
        component: Dashboard,
        path: routes.dashboard,
        title: 'Dashboard',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: CreateTargeted,
        path: routes.createTargetedForm,
        title: 'CreateTargeted',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: FormStructureShow,
        path: routes.showFormStructure,
        title: 'FormStructureShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: FormView,
        path: routes.showForm,
        title: 'Profile',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: FormSearch,
        path: routes.searchForms,
        title: 'FormSearch',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: FormCreate,
        path: routes.generatedForm,
        title: 'FormCreate',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },

    {
        component: CreateCoach,
        path: routes.createCoachForm,
        title: 'CreateCoach',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: CreateCourse,
        path: routes.createCourse,
        title: 'CreateCourse',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: FormStructureCreate,
        path: routes.createFormStructureForm,
        title: 'FormStructureCreate',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: CreateProgram,
        path: routes.createProgramForm,
        title: 'Profile',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: JobCreate,
        path: routes.jobCreate,
        title: 'Profile',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: UnitCreate,
        path: routes.unitCreate,
        title: 'Profile',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: DocumentCreate,
        path: routes.attachDocument,
        title: 'Profile',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: ConductInterviewAssessment,
        path: routes.conductInterviewAssessment,
        title: 'ConductInterviewAssessment',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: ConductTrialPeriodAssessment,
        path: routes.conductTrialPeriodAssessment,
        title: 'ConductTrialPeriodAssessment',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: ConductTrainingPeriodAssessment,
        path: routes.conductTrainingPeriodAssessment,
        title: 'ConductTrainingPeriodAssessment',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: ConductTraineeCourseAssessment,
        path: routes.conductTraineeCourseAssessment,
        title: 'ConductTraineeCourseAssessment',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: ConductCoachCourseAssessment,
        path: routes.conductCoachCourseAssessment,
        title: 'ConductCoachCourseAssessment',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: InterviewAssessmentIndex,
        path: routes.interviewAssessmentIndex,
        title: 'InterviewAssessmentIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: TrialPeriodAssessmentIndex,
        path: routes.TrialPeriodAssessmentIndex,
        title: 'TrialPeriodAssessmentIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: CoachCourseAssessmentIndex,
        path: routes.CoachCourseAssessmentIndex,
        title: 'CoachCourseAssessmentIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: TraineeCourseAssessmentIndex,
        path: routes.TraineeCourseAssessmentIndex,
        title: 'TraineeCourseAssessmentIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: TrainingPeriodAssessmentIndex,
        path: routes.TrainingPeriodAssessmentIndex,
        title: 'TrainingPeriodAssessmentIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: FormStructuresIndex,
        path: routes.showFormsStructures,
        title: 'FormStructuresIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: FormsIndex,
        path: routes.showForms,
        title: 'FormsIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: CoachIndex,
        path: routes.CoachesList,
        title: 'CoachIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: ProgramIndex,
        path: routes.programIndex,
        title: 'ProgramIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: CourseIndex,
        path: routes.courseIndex,
        title: 'CourseIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: EmployeeIndex,
        path: routes.employeeIndex,
        title: 'EmployeeIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: JobIndex,
        path: routes.jobIndex,
        title: 'JobIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: UnitIndex,
        path: routes.unitIndex,
        title: 'UnitIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: IndividualIndex,
        path: routes.individualIndex,
        title: 'IndividualIndex',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: EmployeeShow,
        path: routes.showEmployee,
        title: 'Module - N',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: CourseShow,
        path: routes.showCourse,
        title: 'CourseShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE,
            Roles.COACH
        ],
        exact: true,
    },
    {
        component: ProgramShow,
        path: routes.showProgram,
        title: 'ProgramShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: showJob,
        path: routes.showJob,
        title: 'showJob',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: TargetedShow,
        path: routes.showTargeted,
        title: 'TargetedShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: UnitShow,
        path: routes.showUnit,
        title: 'UnitShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: CoachShow,
        path: routes.showCoach,
        title: 'CoachShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: TrialPeriodAssessmentShow,
        path: routes.TrialPeriodAssessmentIndex,
        title: 'TrialPeriodAssessmentShow',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: AttendanceManager,
        path: routes.showAttendances,
        title: 'AttendanceManager',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
    {
        component: LoginPage,
        path: routes.loginPage,
        title: 'LoginPage',
        permission: [
        ],
        exact: true,
    },
    {
        component: CoursesBrowser,
        path: routes.coursesBrowser,
        title: 'CoursesBrowser',
        permission: [
            Roles.SUPER_ADMIN,
            Roles.SUPRTVISOR,
            Roles.EMPLOYEE
        ],
        exact: true,
    },
]