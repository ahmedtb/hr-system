

import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function TargetedIndividualsTable(props) {
    const individuals = props.individuals

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>name</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {individuals?.map((targeted, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={routes.showTargeted.replace(':id', targeted?.id)}>{targeted?.id}</Link >
                        </td>
                        <td>{targeted.name}</td>
                        <td>{moment(targeted.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}