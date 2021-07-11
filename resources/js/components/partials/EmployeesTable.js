import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'

export default function EmployeesTable(props) {
    const employees = props.employees

    return (

        <table style={{overflowX:'auto'}} className="table table-bordered table-condensed table-responsive">
            <thead>
                <tr>
                    <th >ID</th>
                    <th>الاسم</th>
                    <th>الوظيفة</th>
                    <th>العنوان</th>
                    <th>رقم الهاتف</th>
                    <th>المرتب </th>
                    <th>تاريخ التوظيف</th>
                    <th>البريد الالكتروني</th>
                </tr>
            </thead>
            <tbody>
                {employees?.map((employee, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={routes.showEmployee.replace(':id', employee?.id)}>{employee?.id}</Link >
                        </td>
                        <td>{employee.name}</td>
                        <td>
                            <Link to={routes.showJob.replace(':id', employee?.job.id)}>{employee?.job.name}</Link >
                        </td>
                        <td>
                            {employee.address}
                        </td>
                        <td>{employee.phone_number}</td>
                        <td>{employee.basic_salary}</td>
                        <td>{employee.employment_date}</td>
                        <td>{employee.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}