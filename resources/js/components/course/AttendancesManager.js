import React from 'react'
import moment from 'moment'
import logError from '../utility/logError'
import ApiEndpoints from '../utility/ApiEndpoints'
import { useParams, useLocation } from 'react-router'
import axios from 'axios'

function RecordAttendanceComponent(props) {
    const course_id = props.course_id
    const onChange = props.onChange
    const [course, setcourse] = React.useState(null)
    const [schedualTable, setschedualTable] = React.useState(null)

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

    async function getCourse(id) {
        try {
            const response = await axios.get(ApiEndpoints.getCourse?.replace(':id', id))
            setcourse(response.data.course)
            setschedualTable(response.data.course.schedualTable)
            console.log('course from api: ', response.data)
        } catch (err) {
            logError(err)
        }
    }

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
        getCourse(course_id)
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

        axios.post(ApiEndpoints.createAttendance, data)
            .then(res => {
                console.log(res.data)
                onChange()
            })
            .catch(err => logError(err))
    }

    return (
        <div>
            <div className="modal fade" id="recordAttendanceModal" tabIndex="-1" role="dialog" aria-labelledby="recordAttendanceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="recordAttendanceModalLabel">تسجيل حضور في الدورة: {course?.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">

                            <div className="card col-11 mx-auto my-2 p-3">
                                <div className="row justify-content-center">
                                    <h4>حدد نوع الفرد</h4>

                                    <select
                                        className="form-control"
                                        value={''}
                                        onChange={profileChoiceChange}
                                    >
                                        <option value=''>اختر نوع الفرد</option>
                                        <option value='employee'>موظف</option>
                                        <option value='targeted'>مستهدف</option>
                                        <option value='anonymous'>غير مسجل (مجهول)</option>

                                    </select>
                                </div>
                                {(() => {
                                    if (profileChoice == 'employee') {
                                        return (
                                            <>

                                                <label htmlFor="employee">اختر الموظف</label>
                                                <select
                                                    className="form-control"
                                                    onChange={(e) => setprofile_id(e.target.value)} id="employee">
                                                    <option value=''>قائمة الموظفين المسجلين في الدورة</option>
                                                    {
                                                        employees?.map((employee, index) => (
                                                            <option key={index} value={employee.id}>{employee.name}</option>
                                                        ))
                                                    }
                                                </select>

                                            </>
                                        )
                                    } else if (profileChoice == 'targeted') {
                                        return (
                                            <>

                                                <label htmlFor="targeted">اختر المستهدف</label>
                                                <select
                                                    className="form-control"
                                                    onChange={(e) => setprofile_id(e.target.value)} name="targeted_id">
                                                    <option value=''>اسماء المستهدفين المسجلين في الدورة</option>
                                                    {
                                                        individuals?.map((targeted, index) => (
                                                            <option key={index} value={targeted.id}>{targeted.name}</option>
                                                        ))
                                                    }
                                                </select>

                                            </>
                                        )
                                    } else if (profileChoice == 'anonymous') {
                                        return (
                                            <>
                                                <label >اسم الشخص (اذا كان غير مسجل كموظف او مستهدف):</label>
                                                <input className="form-control" type="text" className="flex-grow-1" onChange={e => setperson_name(e.target.value)} />
                                            </>
                                        )
                                    }
                                })()}

                            </div>

                            <div className="p-2 border rounded col-5 mx-auto">
                                <h4>اليوم (من جدول الدورة)</h4>
                                <select className="form-control" onChange={(e) => setdate(e.target.value)} >
                                    <option value="">يوم الحصة من جدول الدورة</option>
                                    {(schedualTable) ? Object.entries(schedualTable)?.map((day, index) => {

                                        return (
                                            <option key={index} value={day[0]}>{day[0]}</option>
                                        )
                                    }) : null}
                                </select>
                            </div>

                            <div className="p-2 border rounded col-5 mx-auto">
                                <h4>وقت الدخول</h4>
                                <strong className="col-10">من {date ? moment(schedualTable[date][0], 'HH:mm:ss').format('h:mm:ss A') : null}</strong>
                                <strong className="col-10">الى {date ? moment(schedualTable[date][1], 'HH:mm:ss').format('h:mm:ss A') : null}</strong>
                                <input
                                    type="time"
                                    className="form-control"
                                    onChange={e => setentrance_time(e.target.value)}
                                    disabled={date == null ? true : false}
                                />
                            </div>


                            <div className="p-2 border rounded col-11 mx-auto">

                                <h4>ملاحظة:</h4>

                                <textarea type="text" className="form-control" onChange={(e) => setnote(e.target.value)} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                            <button type="button" className="btn btn-primary" onClick={() => submit()} >تسجيل الحضور</button>
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
    const [attendances, setattendances] = React.useState([])



    async function getAttendancesForDate(date) {
        try {
            const response = await axios.get(
                ApiEndpoints.getAttendancesByDay?.replace(':id', course.id)
                    .replace(':date', date)
            )
            setattendances(response.data)
            console.log('attendance of date: ' + date, response.data)
        } catch (err) {
            logError(err)
        }
    }

    async function getAllAttendances() {
        try {
            const response = await axios.get(
                ApiEndpoints.getAllAttendances.replace(':id', course_id)
            )
            setattendances(sortAttends(response.data))
            console.log('attendances from api: ', response.data)
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
        getAllAttendances()
    }, [])

    function filterByDay(day, attends) {
        const selected = moment(day)
        let newAttends = [...attends]
        newAttends = newAttends.filter(attend => moment(attend.date).isSame(selected))
        return newAttends
    }

    async function deleteAttend(id) {
        try {
            const response = await axios.delete(ApiEndpoints.deleteAttendance.replace(':id', id))
            console.log(response.data)
            getAllAttendances()
        } catch (err) {
            logError(err)
        }
    }



    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    سجلات الحضور للدورة {course_id}
                </div>

                <div className="card-body">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#recordAttendanceModal">
                        تسجيل حضور جديد
                    </button>
                    <RecordAttendanceComponent course_id={course_id} onChange={getAllAttendances} />

                    <table className="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <th >اليوم</th>
                                <th >الاسم</th>
                                <th>زمن الدخول</th>
                                <th>ملاحظة</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>

                            {attendances?.map((record, index) => (
                                // console.log(record)
                                <tr key={index}>
                                    <td>{record.date}</td>
                                    <td>{(record.profile) ? record.profile.name : record.person_name}</td>
                                    <td>{record.entrance_time}</td>
                                    <td>{record.note}</td>
                                    <td>
                                        <button type="button" className="btn btn-dark" onClick={() => deleteAttend(record.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}