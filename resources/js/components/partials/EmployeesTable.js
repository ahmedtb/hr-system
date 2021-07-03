import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function EmployeesTable(props) {
    const employees = props.employees

    return (

        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>address</th>
                    <th>basic_salary </th>
                    <th>employment_date</th>
                    <th>job</th>
                    <th>email</th>
                    <th>name</th>
                    <th>phone_number</th>
                </tr>
            </thead>
            <tbody>
                {employees?.map((employee, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={routes.showEmployee.replace(':id', employee?.id)}>{employee?.id}</Link >
                        </td>
                        <td>
                            {employee.address}
                        </td>
                        <td>{employee.basic_salary}</td>
                        <td>{employee.employment_date}</td>
                        <td>
                            job name
                            <Link to={routes.showJob.replace(':id', employee?.job.id)}>{employee?.job.name}</Link >
                        </td>
                        <td>{employee.email}</td>
                        <td>{employee.name}</td>
                        <td>{employee.phone_number}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}