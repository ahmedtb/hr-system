import React from 'react'
import moment from 'moment'
import logError from '../utility/logError'
import ApiEndpoints from '../utility/ApiEndpoints'
import { useParams, useLocation } from 'react-router'
import axios from 'axios'

function RecordAttendanceComponent(props) {
    const course_id = props.course_id

    const [employees, setemployees] = React.useState(null)
    const [individuals, setindividuals] = React.useState(null)
    const [profileChoice, setProfileChoice] = React.useState('')
    function profileChoiceChange(e) {
        setProfileChoice(e.target.value)
    }
    const [profile_id, setprofile_id] = React.useState(null)
    const [date, setdate] = React.useState(null)
    const [entrance_time, setentrance_time] = React.useState(null)
    const [person_name, setperson_name] = React.useState(null)
    const [note, setnote] = React.useState(null)

    async function getEnrolledEmployees() {
        try {
            const res = await axios.get(ApiEndpoints.getCourseEnrolledEmployees.replace(':id', course_id))
            setemployees(res.data)

        } catch (err) {
            logError(err)
        }
    }

    async function getEnrolledIndividuals() {
        try {
            const res = await axios.get(ApiEndpoints.getCourseEnrolledIndividuals.replace(':id', course_id))
            setindividuals(res.data)
        } catch (err) {
            logError(err)
        }
    }

    React.useEffect(() => {
        getEnrolledEmployees()
        getEnrolledIndividuals()
    }, [])

    function submit() {
        let profile_type = null
        if (profileChoice == 'employee') {
            profile_type = 'App\\Models\\Employee'
        } else if (profileChoice == 'targeted') {
            profile_type = 'App\\Models\\TargetedIndividual'
        }
        const data = {
            person_name: person_name,
            profile_type: profile_type,
            profile_id: profile_id,
            date: date,
            entrance_time: entrance_time,
            note: note,
            training_course_id: course_id
        }

        axios.post(ApiEndpoints.createAttendance,data)
            .then(res => console.log(res.data))
            .catch(err => logError(err))
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">تسجيل حضور</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                الدورة {course_id}
                            </div>
                            <label >اسم الشخص (اذا كان غير مسجل):</label>

                            <input type="text" onChange={e => setperson_name(e.target.value)} />

                            <label >اليوم:</label>

                            <input type="date" onChange={e => setdate(e.target.value)} />

                            <label >زمن الدخول:</label>

                            <input type="time" onChange={e => setentrance_time(e.target.value)} />

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
                                                <select onChange={(e) => setprofile_id(e.target.value)} name="employee_id">
                                                    <option value=''>select employee name</option>
                                                    {
                                                        employees?.map((employee, index) => (
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
                                                <select onChange={(e) => setprofile_id(e.target.value)} name="targeted_id">
                                                    <option value=''>select targeted name</option>
                                                    {
                                                        individuals?.map((targeted, index) => (
                                                            <option key={index} value={targeted.id}>{targeted.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </li>
                                        </>
                                    )
                                }
                            })()}


                            <label>ملاحظة:</label>

                            <input type="text" onChange={(e) => setnote(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>submit()} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default function AttendanceManager(props) {

    const params = useParams()

    const course_id = params.course_id
    const location = useLocation()
    const attendancesFromState = location.state.attendances
    const [attendances, setattendances] = React.useState(sortAttends(attendancesFromState) ?? [])

    // async function getattendances(date) {
    //     try {
    //         const response = await axios.get(
    //             ApiEndpoints.getAttendancesByDay?.replace(':id', course.id)
    //                 .replace(':date', date)
    //         )
    //         setattendances(response.data)
    //         console.log('attendance of: ' + date, response.data)
    //     } catch (err) {
    //         logError(err)
    //     }
    // }

    async function getAllAttendances() {
        try {
            const response = await axios.get(
                ApiEndpoints.getAllAttendances.replace(':id', course_id)
            )
            setattendances(sortAttends(response.data))
            console.log('attendance of: ', response.data)
        } catch (err) {
            logError(err)
        }
    }

    function sortAttends(attends) {
        let newAttends = [...attends]
        newAttends.sort((a, b) => moment(a.date).diff(moment(b.date)))
        return newAttends
    }

    React.useEffect(() => {
        if (!attendancesFromState && !attendances.length) {
            getAllAttendances()
        }
    }, [])

    function filterByDay(day, attends) {
        const selected = moment(day)
        let newAttends = [...attends]
        newAttends = newAttends.filter(attend => moment(attend.date).isSame(selected))
        return newAttends
    }


    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    سجلات الحضور للدورة {course_id}
                </div>
                <div className="card-body">

                    <RecordAttendanceComponent course_id={course_id} />

                    <table className="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <th >اليوم</th>
                                <th >الاسم</th>
                                <th>زمن الدخول</th>
                                <th>ملاحظة</th>
                            </tr>
                        </thead>
                        <tbody>

                            {attendances?.map((record, index) => (
                                // console.log(record)
                                <tr key={index}>
                                    <td>{record.date}</td>
                                    <td>{record.profile.name}</td>
                                    <td>{record.entrance_time}</td>
                                    <td>{record.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}