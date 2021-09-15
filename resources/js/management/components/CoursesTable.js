import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'
import AllowedLink from '../components/AllowedLink'
export default function CoursesTable(props) {
    const courses = props.courses
    return (

        <table className="table table-bordered table-condensed table-responsive">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>عنوان الدورة</th>
                    <th>البرنامج التدريبي</th>
                    <th>الحالة</th>
                    <th>المحاضرات التي انجزت</th>
                    <th>المحاضرات المتبيقة</th>
                    <th>نسبة الحضور الكلية</th>
                    <th>تاريخ بدء الدورة</th>
                    <th>تاريخ انتهاء الدورة</th>

                </tr>
            </thead>
            <tbody>
                {courses?.map((course, index) => (
                    <tr key={index}>
                        <td>
                            <AllowedLink to={routes.showCourse.replace(':id', course.id)}>{course.id}</AllowedLink >
                        </td>
                        <td>
                            {course.title}
                        </td>
                        <td>
                            <AllowedLink to={routes.showProgram.replace(':id', course.training_program_id)}>{course.training_program?.title}</AllowedLink >
                        </td>
                        <td>{course.state}</td>
                        <td>
                            {course.wentDays.length}
                        </td>
                        <td>
                            {course.remainingDays.length}
                        </td>
                        <td>{course.attendancePercentage}</td>
                        <td>{course.start_date}</td>
                        <td>{course.end_date}</td>

                    </tr>
                ))}
            </tbody>
        </table>

    )
}