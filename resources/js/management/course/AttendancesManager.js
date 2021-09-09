import React from 'react'
import moment from 'moment'
import logError from '../utility/logError'
import ApiEndpoints from '../utility/ApiEndpoints'
import { useParams, useLocation } from 'react-router'
import axios from 'axios'

import RecordAttendanceModal from './components/RecordAttendanceModal'


export default function AttendanceManager(props) {

    const params = useParams()

    const id = params.id
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
                ApiEndpoints.getAllAttendances.replace(':id', id)
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
                <h3 className="card-header">
                    سجلات الحضور للدورة {id}
                </h3>

                <div className="card-body">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#recordAttendanceModal">
                        تسجيل حضور جديد
                    </button>
                    <RecordAttendanceModal course_id={id} onChange={getAllAttendances} />

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