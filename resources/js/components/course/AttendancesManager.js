import React from 'react'
import moment from 'moment'
import logError from '../utility/logError'
import ApiEndpoints from '../utility/ApiEndpoints'
export default function AttendanceManager(props) {
    const course = props.course
    const [attendances, setattendances] = React.useState(null)

    async function getattendances(date) {
        try {
            console.log(date)
            const response = await axios.get(
                ApiEndpoints.getAttendancesByDay?.replace(':id', course.id)
                    .replace(':date', date)
            )
            setattendances(response.data)
            console.log(response.data)
        } catch (err) {
            logError(err)
        }
    }
    React.useEffect(() => {
        if (course)
            getattendances(moment().locale('en').format('yyyy-MM-DD'))
    }, [course])

    return (
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
                {/* {attendances?.map((record, index) => (
                    <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.profile.name}</td>
                        <td>{record.entrance_time}</td>
                        <td>{record.note}</td>
                    </tr>
                ))} */}
            </tbody>
        </table>
    )
}