import React from 'react'
import moment from 'moment'
import logError from '../utility/logError'
import ApiEndpoints from '../utility/ApiEndpoints'
import { useParams, useLocation } from 'react-router'
export default function AttendanceManager(props) {

    const params = useParams()

    const course_id = params.course_id
    const location = useLocation()
    const attendancesFromState = location.state.attendances
    // const course = props.course
    // const [day, setday] = React.useState(props.day)
    const [attendances, setattendances] = React.useState(attendancesFromState ?? [])


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
            setattendances(response.data)
            console.log('attendance of: ', response.data)
        } catch (err) {
            logError(err)
        }
    }

    React.useEffect(() => {
        // console.log('attendancesFromState',attendancesFromState)
        if (!attendancesFromState)
            getAllAttendances()
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    سجلات الحضور للدورة {course_id}
                </div>
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
    )
}