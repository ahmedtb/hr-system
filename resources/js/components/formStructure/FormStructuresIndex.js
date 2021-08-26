import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import AllowedLink from '../components/AllowedLink'
export default function FormStructuresIndex(props) {
    const [structures, setStructures] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.showFormsStructure).then((response) => {
            setStructures(response.data)
        }).catch((error) => {

        })
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">النماذج الخاصة المتوفرة</div>
                <div className="card-body">
                    <table className="table table-bordered table-condensed" style={{ marginBottom: 0 }}>
                        <thead>
                            <tr>
                                <th >رقم قيد النموذج</th>
                                <th>اسم النموذج</th>
                                <th>عدد الحقول </th>
                                <th>مخصص للاستعمال مع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {structures.map((structure, index) => (
                                <tr key={index}>
                                    <td>
                                        <AllowedLink to={routes.showFormStructure.replace(':id',structure.id) }>
                                            {structure.id}
                                        </AllowedLink>
                                    </td>
                                    <td>{structure.type}</td>
                                    <td>
                                        {
                                            structure.array_of_fields.fields.length
                                        }
                                    </td>
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

