import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../../utility/ApiEndpoints'

export function NumberFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    const [number, setnumber] = React.useState(null)

    return (
        <>
            <div className="border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <label>{label ?? property}</label><br />
                    <input className="form-control ml-1" type="number" onChange={(e) => setnumber(e.target.value)} /><br />
                    <button className="form-control btn btn-info ml-1" onClick={() => {
                        let newparams = Object.assign({},
                            number === null ? null : { property: number },
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
            <div className="border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <strong>{label ?? 'ترشيح بالبرنامج التدريبي'}</strong><br />
                    <select className="form-control" onChange={(e) => settraining_program_id(e.target.value)} name="training_program_id">
                        <option value=''>اختر برنامج تدريبي</option>
                        {
                            trainingPrograms?.map((trainingProgram, index) => (
                                <option key={index} value={trainingProgram.id}>{trainingProgram.title}</option>
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

export function ScopeFilter(props) {
    const params = props.params
    const fetchPage = props.fetchPage
    const property = props.property
    const label = props.label

    return (
        <>
            <div className="border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <button
                        type="button"
                        className={(params?.[property] == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"}
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
            <div className="border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <label>{label ?? property}</label><br />
                    <input className="form-control ml-1" type="date" onChange={(e) => setdate(e.target.value)} /><br />
                    <button className="form-control btn btn-info ml-1" onClick={() => {
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