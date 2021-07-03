import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import { useParams, Link } from 'react-router-dom';

export default function EmployeeShow(props) {

    const { id } = useParams();
    const [employee, setemployee] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getEmployee.replace(':id', id)).then((response) => {
            setemployee(response.data)
            console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    موظف رقم {employee?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="group-list" >
                            <div className="group-list-item" >
                                address {employee?.address}
                            </div>
                            <div className="group-list-item" >
                                basic_salary {employee?.basic_salary}
                            </div>
                            <div className="group-list-item" >
                                email {employee?.email}
                            </div>
                            <div className="group-list-item" >
                                employment_date {employee?.employment_date}
                            </div>
                            <div className="group-list-item" >
                                job name {employee?.job.name}
                            </div>
                            <div className="group-list-item" >
                                name {employee?.name}
                            </div>
                            <div className="group-list-item" >
                                phone_number {employee?.phone_number}
                            </div>

                            <div className="group-list-item" >
                                Trial Period Assessments
                                {/* <table>
                                    <thead>
                                        <tr>
                                            <th >رقم قيد النموذج</th>
                                            <th>اسم النموذج</th>
                                            <th>تركيبة النموذج </th>
                                            <th>مخصص للاستعمال مع</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {structures.map((structure, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <a href={routes.showFormStructure + structure.id}>
                                                        {structure.id}
                                                    </a>
                                                </td>
                                                <td>{structure.type}</td>
                                                <td>
                                                    {
                                                        structure.array_of_fields.fields.map((field, fieldIndex) => (
                                                            null
                                                        ))
                                                    }
                                                </td>
                                                <td>{structure.formable_type}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> */}
                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}