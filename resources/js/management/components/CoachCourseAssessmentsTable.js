import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function CoachCourseAssessmentsTable(props) {
    const coachCourses = props.coachCourses

    return (

        <table className="table table-light table-bordered table-condensed">
            <thead className="thead-light">
                <tr>
                    <th >#</th>
                    <th>training_course</th>
                    <th>congruence_with_content </th>
                    <th>hall_preparation</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {coachCourses?.map((coachCourse, index) => (
                    <tr key={index}>
                        <td>{coachCourse.id}</td>
                        <td>
                            <Link to={routes.showCourse.replace(':id', coachCourse.training_course.id)}>{coachCourse.training_course.title}</Link>
                        </td>
                        <td>{coachCourse.congruence_with_content.rating}</td>
                        <td>{coachCourse.hall_preparation.rating}</td>
                        <td>{moment(coachCourse.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}