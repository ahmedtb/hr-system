export default {
    dashboard: '/api/dashboard',
    createEmployeeForm: '',
    createTargetedForm: '',
    createTargeted: '/api/targeted/create',
    getTargeted: '/api/targeted/:id',

    showFormStructure: '/api/structure/:id',

    formSearch: '/api/form/search/:form_structure_id',

    showForm: '/api/form/:id',
    generateForm: '/api/generateForm',
    getGeneratedForm: '/api/getGeneratedForm/:access_token',
    submitForm: '/api/submitForm/',

    createCourse: '/api/course',

    createFormStructure: '/api/structure/create',
    createCoach: '/api/coach',
    createCoachForm: '/api/coach',
    createProgramForm: '',
    createProgram: '/api/program',

    createEmployeeForm: '/api/createEmployeeForm',
    createEmployee: '/api/createEmployee',
    getEmployee: '/api/employee/:id',

    getEmployees: '/api/getEmployees',
    getTrainingCourses: '/api/getTrainingCourses',


    createInterview: '/api/interview/create',
    createTrialPeriodAssessment: '/api/trialPeriodAssessment/create',
    createTrainingPeriodAssessment: '/api/trainingPeriodAssessment/create',
    createTraineeCourseAssessments: '/api/traineeCourseAssessment/create',
    createCoachCourseAssessments: '/api/coachCourseAssessment/create',
    jobCreate: '/api/job/create',
    unitCreate: '/api/unit/create',

    getTrainingPeriods: '/api/trainingPeriodAssessment/index',
    getTraineeCourses: '/api/traineeCourseAssessment/index',
    getCoachCourses: '/api/coachCourseAssessment/index',
    getInterviewAssessments: '/api/interview/index',
    getTrialPeriods: '/api/trialPeriodAssessment/index',
    getCoaches: '/api/coach/index',
    programIndex: '/api/program/index',
    showForms: '/api/form/index',
    showFormsStructure: '/api/structure/index',
    courseIndex: '/api/course/index',
    employeeIndex: '/api/employee/index',
    unitIndex: '/api/unit/index',
    jobIndex: '/api/job/index',

    getCourse: '/api/course/:id',
    getProgram: '/api/program/:id',
    getJob: '/api/job/:id',
    unitShow: '/api/unit/:id',
    getAllAttendances: '/api/course/:id/attendances',
    getAttendancesByDay: '/api/course/:id/attendances/:date',


}
