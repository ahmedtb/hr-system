import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function CreateCoach(props) {

    const employees = (JSON.parse(props.employees))
    const targetedIndividuals = (JSON.parse(props.targetedIndividuals))
    const formRoute = props.formRoute
    const [profileChoice, setProfileChoice] = useState('')

    function profileChoiceChange(e) {
        setProfileChoice(e.target.value)
    }

    return (

        <form method="POST" action={formRoute} acceptCharset="UTF-8">
            <input type="hidden" name="_token" value={csrf_token} />

            <ul class="list-group">
                <li class="list-group-item">
                    <label for="name">اسم المدرب</label>
                    <input name="name" type="text" id="name" />
                </li>
                <li class="list-group-item">
                    <label for="CV">السيرة الذاتية</label>
                    <textarea name="CV" cols="50" rows="10" id="CV"></textarea>
                </li>
                <li class="list-group-item">
                    <label for="speciality">التخصص</label>
                    <input name="speciality" type="text" id="speciality" />
                </li>


                <li class="list-group-item">
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
                                <li class="list-group-item">
                                    <label for="employee">اختر الموظف</label>
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
                                <li class="list-group-item">
                                    <label for="targeted">اختر المستهدف</label>
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





                <li class="list-group-item">
                    <input type="submit" value="تسجيل" />
                </li>

            </ul>

        </form>

    );
}

export default CreateCoach;

if (document.getElementById('CreateCoach')) {
    var employees = document.getElementById('CreateCoach').getAttribute('employees');
    var targetedIndividuals = document.getElementById('CreateCoach').getAttribute('targetedIndividuals');
    var formRoute = document.getElementById('CreateCoach').getAttribute('formRoute');
    ReactDOM.render(<CreateCoach
        employees={employees} targetedIndividuals={targetedIndividuals} formRoute={formRoute}
    />, document.getElementById('CreateCoach'));
}
