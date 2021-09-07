import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../utility/routesEndpoints'
import moment from 'moment'
export default function FormsTable(props) {
    const forms = props.forms
    return (
        <table className="table table-light">
            <thead className="thead-light">
                <tr>
                    <th>ID</th>
                    <th>type of form</th>
                    <th>تاريخ التسليم</th>
                    <th>عدد الحقول</th>
                </tr>
            </thead>
            <tbody>
                {forms?.map((form, index) => (
                    <tr key={index}>
                        <td><Link to={routes.showForm.replace(':id',form.id)}>{form.id}</Link></td>
                        <td>{form.structure.type}</td>
                        <td>{moment(form.created_at).format('yyyy-MM-DD')}</td>
                        <td>
                            {form.filled_fields.fields.length}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}