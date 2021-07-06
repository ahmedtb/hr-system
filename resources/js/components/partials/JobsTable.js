import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function JobsTable(props) {
    const jobs = props.jobs

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>name</th>
                    <th>purpose </th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {jobs?.map((job, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={routes.showJob.replace(':id', job?.id)}>{job?.id}</Link >
                        </td>
                        <td>
                            {job.name}
                        </td>
                        <td>{job.purpose}</td>
                        <td>{job.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}