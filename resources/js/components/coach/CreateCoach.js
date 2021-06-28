import React, { useState } from 'react';
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

function CreateCoach(props) {

    const [employees, setEmployees] = React.useState([])
    const [targetedIndividuals, setTargetedIndividuals] = React.useState([])
    const [profileChoice, setProfileChoice] = useState('')
    function profileChoiceChange(e) {
        setProfileChoice(e.target.value)
    }

    const [id, setid] = React.useState(null)
    const [name, setname] = React.useState(null)
    const [CV, setCV] = React.useState(null)
    const [speciality, setspeciality] = React.useState(null)

    const submit = () => {
        let data = new FormData
        if(name) data.append('name', name)
        if(CV) data.append('CV', CV)
        if(speciality) data.append('speciality', speciality)
        if (profileChoice == 'employee') {
            if(id) data.append('employee_id', id)
        } else if (profileChoice == 'targeted') {
            if(id) data.append('targeted_individual_id', id)
        }
        axios.post(ApiEndpoints.createCoach, data).then((response) => {
            console.log(response.data)
        }).catch((err) => logError(err))

    }



    React.useEffect(() => {
        axios.get(ApiEndpoints.createCoachForm).then((response) => {
            setEmployees(response.data.employees)
            setTargetedIndividuals(response.data.targetedIndividuals)
        }).catch((err) => logError(err))
    }, [])



    return (

        <>
            <ul className="list-group">
                <li className="list-group-item">
                    <label >اسم المدرب</label>
                    <input onChange={e => setname(e.target.value) } type="text" />
                </li>
                <li className="list-group-item">
                    <label >السيرة الذاتية</label>
                    <textarea onChange={e =>  setCV(e.target.value) } cols="50" rows="10"></textarea>
                </li>
                <li className="list-group-item">
                    <label >التخصص</label>
                    <input onChange={e => setspeciality(e.target.value) } type="text" />
                </li>


                <li className="list-group-item">
                    <select
                        value={''}
                        onChange={profileChoiceChange}
                    >
                        <option value=''>please choose type</option>
                        <option value='employee'>employee</option>
                        <option value='targeted'>targeted</option>

                    </select>
                </li>

                {(() => {
                    if (profileChoice == 'employee') {
                        return (
                            <>
                                <li className="list-group-item">
                                    <label htmlFor="employee">اختر الموظف</label>
                                    <select onChange={(e) => setid(e.target.value) } name="employee_id">
                                        <option value=''>select employee name</option>
                                        {
                                            employees.map((employee, index) => (
                                                <option key={index} value={employee.id}>{employee.name}</option>
                                            ))
                                        }
                                    </select>
                                </li>
                            </>
                        )
                    } else if (profileChoice == 'targeted') {
                        return (
                            <>
                                <li className="list-group-item">
                                    <label htmlFor="targeted">اختر المستهدف</label>
                                    <select onChange={(e) => setid(e.target.value) } name="targeted_id">
                                        <option value=''>select targeted name</option>
                                        {
                                            targetedIndividuals.map((targeted, index) => (
                                                <option key={index} value={targeted.id}>{targeted.id}</option>
                                            ))
                                        }
                                    </select>
                                </li>
                            </>
                        )
                    }
                })()}





                <li className="list-group-item">
                    <input type="button" value="تسجيل" onClick={submit} />
                </li>

            </ul>

        </>

    );
}

export default CreateCoach;
