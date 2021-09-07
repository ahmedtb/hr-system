import React from 'react'
import moment from 'moment'
import logError from '../../utility/logError'
import ApiEndpoints from '../../utility/ApiEndpoints'
import axios from 'axios'

export default function RecordAttendanceModal(props) {
    const course_id = props.course_id
    const onChange = props.onChange
    const [course, setcourse] = React.useState(null)
    const [scheduleTable, setscheduleTable] = React.useState(null)

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
            setscheduleTable(response.data.course.scheduleTable)
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
                                    {(scheduleTable) ? Object.entries(scheduleTable)?.map((day, index) => {

                                        return (
                                            <option key={index} value={day[0]}>{day[0]}</option>
                                        )
                                    }) : null}
                                </select>
                            </div>

                            <div className="p-2 border rounded col-5 mx-auto">
                                <h4>وقت الدخول</h4>
                                <strong className="col-10">من {date ? moment(scheduleTable[date][0], 'HH:mm:ss').format('h:mm:ss A') : null}</strong>
                                <strong className="col-10">الى {date ? moment(scheduleTable[date][1], 'HH:mm:ss').format('h:mm:ss A') : null}</strong>
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