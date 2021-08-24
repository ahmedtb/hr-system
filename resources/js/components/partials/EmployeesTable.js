import React from 'react'
import routes from '../utility/routesEndpoints'
import AllowedLink from '../components/AllowedLink'
import { FaPlus, FaMinus } from 'react-icons/fa'
export default function EmployeesTable(props) {
    const employees = props.employees
    const [fontSize, setfontSize] = React.useState(10)
    return (
        <>
            <FaPlus className="border rounded mx-1" size={20} onClick={() => setfontSize(pre => pre + 1)} />
            <FaMinus className="border rounded mx-1" size={20} onClick={() => setfontSize(pre => pre - 1)} />
            <table style={{ overflowX: 'auto' }} className="table table-bordered table-condensed table-responsive">
                <thead>
                    <tr>
                        <th style={{ fontSize: fontSize }} >ID</th>
                        <th style={{ fontSize: fontSize }} >الاسم</th>
                        <th style={{ fontSize: fontSize }} >الوظيفة</th>
                        <th style={{ fontSize: fontSize }} >العنوان</th>
                        <th style={{ fontSize: fontSize }} >رقم الهاتف</th>
                        <th style={{ fontSize: fontSize }} >المرتب </th>
                        <th style={{ fontSize: fontSize }} >تاريخ التوظيف</th>
                        <th style={{ fontSize: fontSize }} >البريد الالكتروني</th>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map((employee, index) => (
                        <tr key={index}>
                            <td style={{ fontSize: fontSize }} >
                                <AllowedLink to={routes.showEmployee.replace(':id', employee.id)}>{employee.id}</AllowedLink >
                            </td>
                            <td style={{ fontSize: fontSize }} >{employee.name}</td>
                            <td style={{ fontSize: fontSize }} >
                                <AllowedLink to={routes.showJob.replace(':id', employee.job?.id)}>{employee.job?.name}</AllowedLink >
                            </td>
                            <td style={{ fontSize: fontSize }} >
                                {employee.address}
                            </td>
                            <td style={{ fontSize: fontSize }} >{employee.phone_number}</td>
                            <td style={{ fontSize: fontSize }} >{employee.basic_salary}</td>
                            <td style={{ fontSize: fontSize }} >{employee.employment_date}</td>
                            <td style={{ fontSize: fontSize }} >{employee.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}