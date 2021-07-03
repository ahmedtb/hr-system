export default {
    dashboard: '/api/dashboard',
    createEmployeeForm: '',
    createTargetedForm: '',
    createTargeted: '/api/targeted/create',
    getTargeted: '/api/targeted/:id',

    showFormsStructure: '/api/structure/index',
    showFormStructure: '/api/structure/:id',

    formSearch: '/api/form/search/:form_structure_id',

    showForms: '/api/form/index',
    showForm: '/api/form/:id',
    generateForm: '/api/generateForm',
    getGeneratedForm: '/api/getGeneratedForm/:access_token',
    submitForm: '/api/submitForm/',

    createFormStructure: '/api/structure/create',
    createCoach: '/api/coach',
    createCoachForm: '/api/coach',
    createProgramForm: '',
    createProgram: '/api/program',

    createEmployeeForm: '/api/createEmployeeForm',
    createEmployee: '/api/createEmployee',
    getEmployee: '/api/employee/:id',

    getEmployees: '/api/getEmployees',
    getUnits: '/api/getUnits',
    getTrainingCourses: '/api/getTrainingCourses',
    getCoaches: '/api/coach/index',


    createInterview: '/api/interview/create',
    createTrialPeriodAssessment: '/api/trialPeriodAssessment/create',
    createTrainingPeriodAssessment: '/api/trainingPeriodAssessment/create',
    createTraineeCourseAssessments: '/api/traineeCourseAssessment/create',
    createCoachCourseAssessments: '/api/coachCourseAssessment/create',

    getTrialPeriods: '/api/trialPeriodAssessment/index',
    getTrainingPeriods: '/api/trainingPeriodAssessment/index',
    getTraineeCourses: '/api/traineeCourseAssessment/index',
    getCoachCourses: '/api/coachCourseAssessment/index',
    getInterviewAssessments: '/api/interview/index',

    getCourse: '/api/course/:id',
    getProgram: '/api/program/:id',

}
