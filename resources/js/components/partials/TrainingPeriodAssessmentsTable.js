import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function TrainingPeriodsTable(props) {
    const trainingPeriods = props.trainingPeriods

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
                {trainingPeriods?.map((trainingPeriod, index) => (
                    <tr key={index}>
                        <td>{trainingPeriod.id}</td>
                        <td>
                            <Link to={routes.showEmployee.replace(':id', trainingPeriod.employee.id)}>{trainingPeriod.employee.name}</Link>
                        </td>
                        <td>{trainingPeriod.behavior}</td>
                        <td>{trainingPeriod.ability_to_improve}</td>
                        <td>{trainingPeriod.absence_days}</td>
                        <td>{moment(trainingPeriod.created_at).format('yyyy-MM-DD')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}