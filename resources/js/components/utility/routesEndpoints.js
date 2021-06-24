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
}

export default routes;