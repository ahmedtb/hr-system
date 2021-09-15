import React from 'react'
import routes from '../utility/routesEndpoints'
import { Link } from 'react-router-dom'
export default function UnitsList(props) {
    const units = props.units


    return (
        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>الاسم</th>
                    <th>وصفة الوحدة</th>
                    <th>الوحدة التي تتبعها</th>
                </tr>
            </thead>
            <tbody>
                {units?.map((unit, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={routes.showUnit.replace(':id', unit?.id)}>{unit?.id}</Link >
                        </td>
                        <td>
                            {unit.name}
                        </td>
                        <td>{unit.purpose}</td>
                        <td>
                            <Link to={routes.showUnit.replace(':id', unit.parent_id)}>
                                {unit.parent?.name}
                            </Link>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}