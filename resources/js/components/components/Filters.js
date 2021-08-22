import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export function NumberFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [number, setnumber] = React.useState(null)

    return (
        <>
            <div className="col-5 border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <label>{label ?? property}</label><br />
                    <input className="form-control ml-1" type="number" onChange={(e) => setnumber(e.target.value)} /><br />
                    <button className="col-2 form-control btn btn-success ml-1" onClick={() => {
                        let newparams = Object.assign({},
                            number === null ? null : { [property]: number },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>فلترة</button>
                </div>

            </div>
        </>
    )
}

export function TrainingProgramFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [trainingPrograms, settrainingPrograms] = React.useState(null)
    const [training_program_id, settraining_program_id] = React.useState(null)

    async function gettrainingPrograms() {
        axios.get(ApiEndpoints.getPrograms).then((response) => {
            settrainingPrograms(response.data)
        }).catch((err) => logError(err))
    }

    React.useEffect(() => {
        gettrainingPrograms()
    }, [])

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <strong>{label ?? 'ترشيح بالبرنامج التدريبي'}</strong><br />
                    <select className="form-control" onChange={(e) => settraining_program_id(e.target.value)} name="training_program_id">
                        <option value=''>اختر برنامج تدريبي</option>
                        {
                            trainingPrograms?.map((trainingProgram, index) => (
                                <option
                                    key={index}
                                    value={trainingProgram.id}
                                // selected={params?.training_program_id == trainingProgram.id}
                                >
                                    {trainingProgram.title}
                                </option>
                            ))
                        }
                    </select>

                    <button type="button" className="btn btn-primary" onClick={() => {
                        let newparams = Object.assign({},
                            training_program_id === null ? null : { [property ?? 'training_program_id']: training_program_id },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>ترشيح</button>
                </div>

            </div>
        </>
    )
}

export function EmployeeFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [employees, setemployees] = React.useState(null)
    const [employee_id, setemployee_id] = React.useState(null)

    async function getemployees() {
        axios.get(ApiEndpoints.getEmployees).then((response) => {
            setemployees(response.data)
        }).catch((err) => logError(err))
    }

    React.useEffect(() => {
        getemployees()
    }, [])

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <strong>{label ?? 'ترشيح بالموظف'}</strong><br />
                    <select className="form-control" onChange={(e) => setemployee_id(e.target.value)} name="employee_id">
                        <option value={''}>اختر الموظف</option>
                        {
                            employees?.map((employee, index) => (
                                <option
                                    key={index}
                                    value={employee.id}
                                // selected={params?.employee_id == employee.id}
                                >
                                    {employee.name}
                                </option>
                            ))
                        }
                    </select>

                    <button type="button" className="btn btn-primary" onClick={() => {
                        let newparams = Object.assign({},
                            employee_id === null || employee_id === '' ? { [property ?? 'employee_id']: undefined } : { [property ?? 'employee_id']: employee_id },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>ترشيح</button>
                </div>

            </div>
        </>
    )
}

export function JobFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [jobs, setjobs] = React.useState(null)
    const [job_id, setjob_id] = React.useState(null)

    async function getjobs() {
        axios.get(ApiEndpoints.getJobs).then((response) => {
            setjobs(response.data)
        }).catch((err) => logError(err))
    }

    React.useEffect(() => {
        getjobs()
    }, [])

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <strong>{label ?? 'ترشيح بالوظيفة'}</strong><br />
                    <select className="form-control" onChange={(e) => setjob_id(e.target.value)} name="job_id">
                        <option value={''}>اختر الوظيفة</option>
                        {
                            jobs?.map((employee, index) => (
                                <option
                                    key={index}
                                    value={employee.id}
                                // selected={params?.job_id == employee.id}
                                >
                                    {employee.name}
                                </option>
                            ))
                        }
                    </select>

                    <button type="button" className="btn btn-primary" onClick={() => {
                        let newparams = Object.assign({},
                            job_id === null || job_id === '' ? { [property ?? 'job_id']: undefined } : { [property ?? 'job_id']: job_id },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>ترشيح</button>
                </div>

            </div>
        </>
    )
}

export function ScopeFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    return (
        <>
            <div className="col-5 border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <button
                        type="button"
                        className={(params?.[property] == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-success mx-2 my-1"}
                        onClick={() => fetchPage(params[property] == 'true' ? { ...params, [property]: undefined } : { ...params, [property]: 'true' })}
                    >
                        {label ?? property}
                    </button>

                </div>

            </div>
        </>
    )
}

export function DateFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [date, setdate] = React.useState(null)

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <label>{label ?? property}</label><br />
                    <input className="form-control ml-1" type="date" onChange={(e) => setdate(e.target.value)} /><br />
                    <button className="col-2 form-control btn btn-success ml-1" onClick={() => {
                        let newparams = Object.assign({},
                            date === null ? null : { [property]: date },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>فلترة</button>
                </div>

            </div>
        </>
    )
}

export function TextFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [text, settext] = React.useState(null)

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <label className="">{label ?? property}</label><br />
                    <input className="form-control ml-1" type="text" onChange={(e) => settext(e.target.value)} /><br />
                    <button className="col-2 form-control btn btn-success ml-1" onClick={() => {
                        let newparams = Object.assign({},
                            text === null ? null : { [property]: text },
                        )
                        fetchPage({ ...params, ...newparams })
                    }}>فلترة</button>
                </div>

            </div>
        </>
    )
}

export function OrderByDescFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    // const [trait, settrait] = React.useState(null)

    return (
        <>
            <div className="col-5 border rounded p-1 m-2">
                <div className="d-flex flex-row my-2 align-items-center">
                <button
                        type="button"
                        className={(params?.orderByDesc == property ) ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"}
                        onClick={() => fetchPage(params['orderByDesc'] == property ? { ...params, orderByDesc: undefined } : { ...params, orderByDesc: property })}
                    >
                        {label ?? property}
                    </button>
                </div>

            </div>
        </>
    )
}