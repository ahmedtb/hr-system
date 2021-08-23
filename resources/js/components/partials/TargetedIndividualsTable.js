

import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'
import AllowedLink from '../components/AllowedLink'

export default function TargetedIndividualsTable(props) {
    const individuals = props.individuals

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>name</th>
                    <th>address</th>
                    <th>phone_number</th>
                    <th>email</th>
                    <th>description</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {individuals?.map((targeted, index) => (
                    <tr key={index}>
                        <td>
                            <AllowedLink to={routes.showTargeted.replace(':id', targeted?.id)}>{targeted?.id}</AllowedLink >
                        </td>
                        <td>{targeted.name}</td>
                        <td>{targeted.address}</td>
                        <td>{targeted.phone_number}</td>
                        <td>{targeted.email}</td>
                        <td>{targeted.description}</td>
                        <td>{moment(targeted.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}