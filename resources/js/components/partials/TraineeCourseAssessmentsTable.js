import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function TraineeCourseAssessmentsTable(props) {
    const traineeCourses = props.traineeCourses

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>training course title</th>
                    <th>coach_communication </th>
                    <th>coach_cooperation</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {traineeCourses?.map((traineeCourse, index) => (
                    <tr key={index}>
                        <td>{traineeCourse.id}</td>
                        <td>
                            <Link to={routes.showCourse.replace(':id', traineeCourse.training_course.id)}>{traineeCourse.training_course.title}</Link>
                        </td>
                        <td>{traineeCourse.coach_communication.rating}</td>
                        <td>{traineeCourse.coach_cooperation.rating}</td>
                        <td>{moment(traineeCourse.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}