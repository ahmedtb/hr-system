import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError'
import AllowedLink from '../components/AllowedLink'
export default function FormStructuresIndex(props) {
    const [structures, setStructures] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.showFormsStructure).then((response) => {
            setStructures(response.data)
            console.log('showFormsStructure',response.data)
        }).catch((error) => { logError(error) })
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <h4 className="card-header d-flex flex-row justify-content-between">
                    النماذج الخاصة المتوفرة
                    <AllowedLink to={routes.createFormStructureForm}>انشاء نوع نماذج جديد</AllowedLink>
                </h4>
                <div className="card-body">
                    <table className="table table-light table-bordered table-condensed" style={{ marginBottom: 0 }}>
                        <thead className="thead-light">
                            <tr>
                                <th >رقم قيد النموذج</th>
                                <th>اسم النموذج</th>
                                <th>عدد الحقول </th>
                                <th>النسخ المتاحة</th>
                                <th>مخصص للاستعمال مع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {structures.map((structure, index) => (
                                <tr key={index}>
                                    <td>
                                        <AllowedLink to={routes.showFormStructure.replace(':id', structure.id)}>
                                            {structure.id}
                                        </AllowedLink>
                                    </td>
                                    <td>{structure.type}</td>
                                    <td>
                                        {
                                            structure.array_of_fields.fields.length
                                        }
                                    </td>
                                    <td>{structure.copies_count}</td>
                                    <td>{structure.formable_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

