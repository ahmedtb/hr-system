export default {
    dashboard: '/api/dashboard',
    createEmployeeForm: '',
    createTargetedForm: '',
    createTargeted: '/api/targeted/create',
    editIndividual: '/api/individual/:id',
    getTargeted: '/api/targeted/:id',

    showFormStructure: '/api/structure/:id',

    formSearch: '/api/form/search/:form_structure_id',

    showForm: '/api/form/:id',
    generateForm: '/api/generateForm',
    avaliableTokens: '/api/avaliableTokens/:id',
    deleteToken: '/api/deleteToken/:id',
    getGeneratedForm: '/api/getGeneratedForm/:access_token',
    submitForm: '/api/submitForm/',

    createCourse: '/api/course',
    deleteCourse: '/api/course/:id',
    editCourse: '/api/course/:id',
    
    createFormStructure: '/api/structure/create',
    createCoach: '/api/coach',
    createCoachForm: '/api/coach',
    createProgramForm: '',
    createProgram: '/api/program',
    deleteProgram: '/api/program/:id',
    editProgram: '/api/program/:id',

    createDocument: '/api/document/create',
    createComment: '/api/comment/create',


    createEmployeeForm: '/api/createEmployeeForm',
    createEmployee: '/api/createEmployee',
    getEmployee: '/api/employee/:id',
    deleteEmployee: '/api/employee/:id',
    editEmployee: '/api/employee/:id',
    
    getEmployeeResumedCourses: '/api/employee/:id/courses/resumed',

    getEmployees: '/api/getEmployees',
    getCoaches: '/api/getCoaches',
    getTrainingCourses: '/api/getTrainingCourses',
    getIndividuals: '/api/getIndividuals',
    getUnits: '/api/getUnits',
    getPrograms: '/api/getPrograms',
    getJobs: '/api/getJobs',

    createInterview: '/api/interview/create',
    createTrialPeriodAssessment: '/api/trialPeriodAssessment/create',
    createTrainingPeriodAssessment: '/api/trainingPeriodAssessment/create',
    createTraineeCourseAssessments: '/api/traineeCourseAssessment/create',
    createCoachCourseAssessments: '/api/coachCourseAssessment/create',
    jobCreate: '/api/job/create',
    unitCreate: '/api/unit/create',

    enrollInCourse: '/api/course/:id/enroll',
    createAttendance: '/api/attendance/create',
    deleteAttendance: '/api/attendance/:id',

    getTrainingPeriods: '/api/trainingPeriodAssessment/index',
    getTraineeCourses: '/api/traineeCourseAssessment/index',
    getCoachCourses: '/api/coachCourseAssessment/index',
    getInterviewAssessments: '/api/interview/index',
    getTrialPeriods: '/api/trialPeriodAssessment/index',

    getTrialPeriod: '/api/trialPeriodAssessment/:id',
    getCoachCourse: '/api/coachCourseAssessment/:id',
    getTraineeCourse: '/api/traineeCourseAssessment/:id',
    getTrainingPeriod: '/api/trainingPeriodAssessment/:id',
    getInterview: '/api/interview/:id',

    coachesIndex: '/api/coach/index',
    programIndex: '/api/program/index',
    showForms: '/api/form/index',
    showFormsStructure: '/api/structure/index',
    courseIndex: '/api/course/index',
    employeeIndex: '/api/employee/index',
    individualIndex: '/api/individual/index',
    unitIndex: '/api/unit/index',
    jobIndex: '/api/job/index',
    documentIndex: '/api/document/index',
    commentIndex: '/api/comment/index',

    getCourse: '/api/course/:id',
    getProgram: '/api/program/:id',
    getJob: '/api/job/:id',
    unitShow: '/api/unit/:id',
    getAllAttendances: '/api/course/:id/attendances',
    getAttendancesByDay: '/api/course/:id/attendances/:date',

    getCourseEnrolledEmployees: '/api/course/:id/employees',
    getCourseEnrolledIndividuals: '/api/course/:id/individuals',
    getCoach: '/api/coach/:id',

    deleteIndividual: '/api/individual/:id',

}
