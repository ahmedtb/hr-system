import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function TrialPeriodsTable(props) {
    const trialPeriods = props.trialPeriods

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>الموظف</th>
                    <th>behavior </th>
                    <th>ability_to_improve</th>
                    <th>absence_days</th>
                    <th>created_at</th>
                </tr>
            </thead>
            <tbody>
                {trialPeriods?.map((trialPeriod, index) => (
                    <tr key={index}>
                        <td>{trialPeriod.id}</td>
                        <td>
                            <Link to={routes.showEmployee.replace(':id',trialPeriod.employee.id)}>{trialPeriod.employee.name}</Link>
                        </td>
                        <td>{trialPeriod.behavior}</td>
                        <td>{trialPeriod.ability_to_improve}</td>
                        <td>{trialPeriod.absence_days}</td>
                        <td>{moment(trialPeriod.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}