import React, { useState } from 'react';
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'

function CreateCoach(props) {

    const [employees, setEmployees] = React.useState([])
    const [targetedIndividuals, setTargetedIndividuals] = React.useState([])

    React.useEffect(() => {
        axios.get(ApiEndpoints.createCoachForm).then((response) => {
            setEmployees(response.data.employees)
            setTargetedIndividuals(response.data.targetedIndividuals)
        }).catch(() => {

        })
    }, [])
    const [profileChoice, setProfileChoice] = useState('')

    function profileChoiceChange(e) {
        setProfileChoice(e.target.value)
    }

    return (

        <form method="POST" action={ApiEndpoints.createCoach} acceptCharset="UTF-8">
            <input type="hidden" name="_token" value={csrf_token} />

            <ul className="list-group">
                <li className="list-group-item">
                    <label htmlFor="name">اسم المدرب</label>
                    <input name="name" type="text" id="name" />
                </li>
                <li className="list-group-item">
                    <label htmlFor="CV">السيرة الذاتية</label>
                    <textarea name="CV" cols="50" rows="10" id="CV"></textarea>
                </li>
                <li className="list-group-item">
                    <label htmlFor="speciality">التخصص</label>
                    <input name="speciality" type="text" id="speciality" />
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
                                    <select name="employee_id">
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
                                    <select name="targeted_id">
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
                    <input type="submit" value="تسجيل" />
                </li>

            </ul>

        </form>

    );
}

export default CreateCoach;
