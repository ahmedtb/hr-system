import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function InterviewAssessmetsTable(props) {
    const interviews = props.interviews

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>interviewer</th>
                    <th>arabic</th>
                    <th>comprehension </th>
                    <th>culture</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {interviews?.map((interview, index) => (
                    <tr key={index}>
                        <td>{interview.id}</td>
                        <td>
                            <Link to={routes.showEmployee.replace(':id', interview.interviewer.id)}>{interview.interviewer.name}</Link>
                        </td>
                        <td>{interview.arabic}</td>
                        <td>{interview.comprehension}</td>
                        <td>{interview.culture}</td>
                        <td>{moment(interview.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}