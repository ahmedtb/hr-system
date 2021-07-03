const routes = {
    dashboard: '/react/',
    createEmployeeForm: '/react/createEmployeeForm',
    createTargetedForm: '/react/createTargetedForm',
    showFormsStructures: '/react/structureIndex',
    showFormStructure: '/react/structure/',
    showForms: '/react/formIndex',
    showForm: '/react/form/:id',
    generatedForm: '/react/form/token/:access_token',
    searchForms: '/react/form/search/:form_structure_id',

    createFormStructureForm: '/react/structureCreate',
    createCoachForm: '/react/coachCreate',
    createProgramForm: '/react/programCreate',

    conductInterviewAssessment: '/react/assessment/interview',
    conductTrialPeriodAssessment: '/react/assessment/trialPeriod',
    conductTrainingPeriodAssessment: '/react/assessment/trainingPeriod',
    TraineeCourseAssessment: '/react/assessment/traineeCourseAssessment',
    CoachCourseAssessment: '/react/assessment/coachCourseAssessment',
    AssessmentsIndex: '/react/assessment/index',

    CoachesList: '/react/coach/index',

    showTargeted: '/react/targeted/:id',
    showEmployee: '/react/employee/:id',
    showCourse: '/react/course/:id',
    showProgram: '/react/program/:id',
    showJob: '/react/job/:id',

}

export default routes;