import React, { useState } from 'react';
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import routes from '../utility/routesEndpoints'
import { Redirect } from 'react-router'
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
        if (name) data.append('name', name)
        if (CV) data.append('CV', CV)
        if (speciality) data.append('speciality', speciality)
        if (profileChoice == 'employee') {
            if (id) data.append('employee_id', id)
        } else if (profileChoice == 'targeted') {
            if (id) data.append('targeted_individual_id', id)
        }
        axios.post(ApiEndpoints.createCoach, data).then((response) => {
            console.log(response.data)
            setredirect(true)
        }).catch((err) => logError(err))

    }



    React.useEffect(() => {
        axios.get(ApiEndpoints.createCoachForm).then((response) => {
            setEmployees(response.data.employees)
            setTargetedIndividuals(response.data.targetedIndividuals)
        }).catch((err) => logError(err))
    }, [])


    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.dashboard} />;
    }

    return (

        <div className="card">
            <div className="card-header">اضافة مدرب</div>

            <div className="card-body row">

                <div className="col-2 ">
                    <div className="p-2 border rounded m-2 text-center">
                        <label className="">صورة المدرب</label>
                        <img height='100' onClick={() => { }} src={'/css/profile.png'} />
                    </div>
                </div>

                <div className="col-10 row align-items-start">
                    <div className="col-10 p-2 border rounded m-2 row">
                        <label className="col-4">اسم المدرب</label>
                        <input className="col-8 form-control" value={name} onChange={(e) => setname(e.target.value)} type="text" />
                    </div>

                    <div className="col-10 p-2 border rounded m-2 row ">
                        <label className="col-4">الملف الشخصي للفرد</label>

                        <div className="col-8  form-control">
                            <select
                                className="form-control"
                                value={''}
                                onChange={profileChoiceChange}
                            >
                                <option value=''>اختر نوع الملف الشخصي</option>
                                <option value='employee'>موظف</option>
                                <option value='targeted'>مستهدف</option>

                            </select>

                            {(() => {
                                if (profileChoice == 'employee') {
                                    return (
                                        <div className="col-12 row">
                                            <label className="col-4" htmlFor="employee">اختر الموظف</label>
                                            <select className="col-8 form-control" onChange={(e) => setid(e.target.value)} name="employee_id">
                                                <option value=''>select employee name</option>
                                                {
                                                    employees.map((employee, index) => (
                                                        <option key={index} value={employee.id}>{employee.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    )
                                } else if (profileChoice == 'targeted') {
                                    return (
                                        <div className="col-12 row">

                                            <label className="col-4" htmlFor="targeted">اختر المستهدف</label>
                                            <select className="col-8 form-control" onChange={(e) => setid(e.target.value)} name="targeted_id">
                                                <option value=''>select targeted name</option>
                                                {
                                                    targetedIndividuals.map((targeted, index) => (
                                                        <option key={index} value={targeted.id}>{targeted.id}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    )
                                }
                            })()}

                        </div>
                    </div>

                    <div className="col-10 p-2 border rounded m-2 row ">
                        <label className="col-4">التخصص</label>
                        <input className="col-8  form-control" onChange={e => setspeciality(e.target.value)} type="text" />
                    </div>

                    <div className="col-10 p-2 border rounded m-2 row ">
                        <label className="col-4">السيرة الذاتية</label>
                        <textarea className="col-8 form-control" onChange={e => setCV(e.target.value)} rows="5"></textarea>
                    </div>
                </div>

                <div className="col-8 text-center">
                    <input type="button" value="تسجيل" onClick={submit} />
                </div>

            </div>
        </div >


    );
}

export default CreateCoach;
