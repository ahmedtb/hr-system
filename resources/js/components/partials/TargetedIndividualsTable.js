

import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'
import AllowedLink from '../components/AllowedLink'

import { FaPlus, FaMinus } from 'react-icons/fa'
export default function TargetedIndividualsTable(props) {
    const individuals = props.individuals
    const [fontSize, setfontSize] = React.useState(10)
    return (
        <>
            <FaPlus className="border rounded mx-1" size={20} onClick={() => setfontSize(pre => pre + 1)} />
            <FaMinus className="border rounded mx-1" size={20} onClick={() => setfontSize(pre => pre - 1)} />

            <table className="table table-bordered table-condensed table-responsive">
                <thead>
                    <tr>
                        <th style={{ fontSize: fontSize }}  >ID</th>
                        <th style={{ fontSize: fontSize }} >name</th>
                        <th style={{ fontSize: fontSize }} >address</th>
                        <th style={{ fontSize: fontSize }} >phone_number</th>
                        <th style={{ fontSize: fontSize }} >email</th>
                        <th style={{ fontSize: fontSize }} >description</th>
                        <th style={{ fontSize: fontSize }} >created_at</th>
                    </tr>
                </thead>
                <tbody>
                    {individuals?.map((targeted, index) => (
                        <tr key={index}>
                            <td style={{ fontSize: fontSize }} >
                                <AllowedLink to={routes.showTargeted.replace(':id', targeted?.id)}>{targeted?.id}</AllowedLink >
                            </td>
                            <td style={{ fontSize: fontSize }} >{targeted.name}</td>
                            <td style={{ fontSize: fontSize }} >{targeted.address}</td>
                            <td style={{ fontSize: fontSize }} >{targeted.phone_number}</td>
                            <td style={{ fontSize: fontSize }} >{targeted.email}</td>
                            <td style={{ fontSize: fontSize }} >{targeted.description}</td>
                            <td style={{ fontSize: fontSize }} >{moment(targeted.created_at).format('yyyy-MM-DD')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}