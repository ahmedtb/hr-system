import React from 'react'
import moment from 'moment'
import logError from '../../utility/logError'
import ApiEndpoints from '../../utility/ApiEndpoints'
import axios from 'axios'
import SelectSearch from '../../components/SelectSearch'

export default function EnrollmentModal(props) {
    const course = props.course

    const onChange = props.onChange
    const [employees, setemployees] = React.useState(null)
    const [individuals, setindividuals] = React.useState(null)
    const [profileChoice, setProfileChoice] = React.useState('')

    const [profile_id, setprofile_id] = React.useState(null)

    function profileChoiceChange(e) {
        setprofile_id(null)
        setProfileChoice(e.target.value)
    }

    async function getEmployees() {
        try {
            const res = await axios.get(ApiEndpoints.getEmployees)
            setemployees(res.data)

        } catch (err) {
            logError(err)
        }
    }

    async function getIndividuals() {
        try {
            const res = await axios.get(ApiEndpoints.getIndividuals)
            setindividuals(res.data)
        } catch (err) {
            logError(err)
        }
    }

    function submit() {
        let profile_type = null
        if (profileChoice == 'employee') {
            profile_type = 'App\\Models\\Employee'
        } else if (profileChoice == 'targeted') {
            profile_type = 'App\\Models\\TargetedIndividual'
        }
        const data = {
            profile_type: profile_type,
            profile_id: profile_id,
        }

        axios.post(ApiEndpoints.enrollInCourse.replace(':id', course.id), data)
            .then(res => {
                console.log(res.data)
                onChange()
            })
            .catch(err => logError(err))
    }


    React.useEffect(() => {
        getEmployees()
        getIndividuals()
    }, [])

    return (
        <div className="modal fade" id="EnrollmentModal" tabIndex="-1" role="dialog" aria-labelledby="EnrollmentModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="EnrollmentModalLabel">?????????? ???? ????????????: {course?.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body row">

                        <div className="card col-11 mx-auto my-2 p-3">
                            <div className="row justify-content-center">
                                <h4>?????? ?????? ??????????</h4>

                                <select
                                    className="form-control"
                                    value={''}
                                    onChange={profileChoiceChange}
                                >
                                    <option value=''>???????? ?????? ??????????</option>
                                    <option value='employee'>????????</option>
                                    <option value='targeted'>????????????</option>
                                </select>
                            </div>
                            {(() => {
                                if (profileChoice == 'employee') {
                                    return (
                                        <>

                                            <label htmlFor="employee">???????? ????????????</label>
                                            {/* <select
                                                className="form-control"
                                                onChange={(e) => setprofile_id(e.target.value)} id="employee">
                                                <option value=''>?????????? ????????????????</option>
                                                {
                                                    employees?.map((employee, index) => (
                                                        <option key={index} value={employee.id}>{employee.name}</option>
                                                    ))
                                                }
                                            </select> */}
                                            <SelectSearch
                                                options={employees}
                                                setSelectedValue={(value) => setprofile_id(value)}
                                                label={'???????? ????????????'}
                                                defaultValue={'1'}
                                                valueKeyWord='id'
                                                nameKeyWord='name'
                                            />
                                        </>
                                    )
                                } else if (profileChoice == 'targeted') {
                                    return (
                                        <>

                                            <label htmlFor="targeted">???????? ????????????????</label>
                                            {/* <select
                                                className="form-control"
                                                onChange={(e) => setprofile_id(e.target.value)} name="targeted_id">
                                                <option value=''>?????????? ???????????????????? ???????????????? ???? ????????????</option>
                                                {
                                                    individuals?.map((targeted, index) => (
                                                        <option key={index} value={targeted.id}>{targeted.name}</option>
                                                    ))
                                                }
                                            </select> */}
                                            <SelectSearch
                                                options={individuals}
                                                setSelectedValue={(value) => setprofile_id(value) }
                                                label={'???????? ????????????????'}
                                                defaultValue={'1'}
                                                valueKeyWord='id'
                                                nameKeyWord='name'
                                            />
                                        </>
                                    )
                                }
                            })()}

                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">??????????</button>
                        <button type="button" className="btn btn-primary" onClick={() => submit()} >?????????? ???? ????????????</button>
                    </div>
                </div>
            </div>
        </div>
    )
}