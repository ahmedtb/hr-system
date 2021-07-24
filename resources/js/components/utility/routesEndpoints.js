const routes = {
    dashboard: '/react/',
    createEmployeeForm: '/react/createEmployeeForm',
    createTargetedForm: '/react/createTargetedForm',
    showFormStructure: '/react/structure/',
    showForm: '/react/form/:id',
    generatedForm: '/react/form/token/:access_token',
    searchForms: '/react/form/search/:form_structure_id',
    
    createFormStructureForm: '/react/structureCreate',
    createCoachForm: '/react/coachCreate',
    createProgramForm: '/react/programCreate',
    createCourse: '/react/course/create',
    jobCreate: '/react/job/create',
    unitCreate: '/react/unit/create',
    
    conductInterviewAssessment: '/react/assessment/interview',
    conductTrialPeriodAssessment: '/react/assessment/trialPeriod',
    conductTrainingPeriodAssessment: '/react/assessment/trainingPeriod',
    TraineeCourseAssessment: '/react/assessment/traineeCourseAssessment',
    CoachCourseAssessment: '/react/assessment/coachCourseAssessment',
    
    TrialPeriodAssessmentIndex: '/react/assessment/trialPeriod/index',
    
    showTargeted: '/react/targeted/:id',
    showEmployee: '/react/employee/:id',
    showCourse: '/react/course/:id',
    showProgram: '/react/program/:id',
    showUnit: '/react/unit/:id',
    showJob: '/react/job/:id',
    showAttendances: '/react/attendances/:course_id',
    
    programIndex: '/react/program/index',
    CoachesList: '/react/coach/index',
    AssessmentsIndex: '/react/assessment/index',
    showForms: '/react/formIndex',
    showFormsStructures: '/react/structureIndex',
    courseIndex: '/react/course/index',
    employeeIndex: '/react/employee/index',
    jobIndex: '/react/job/index',
    unitIndex: '/react/unit/index',
    interviewAssessmentIndex: '/react/assessment/interview/index',


}

export default routes;