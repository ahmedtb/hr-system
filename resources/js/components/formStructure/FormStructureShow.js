import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints'
import Fields from '../fields/Fields'
import { useParams, Link } from 'react-router-dom';

export default function FormStructureShow(props) {

    const { id } = useParams();
    const [structure, setStructure] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.showFormStructure + id).then((response) => {
            setStructure(response.data)
        }).catch(() => {

        })
    }, [])
    return (
        <div className="col-md-10">


            <div className="card">
                <div className="card-header">
                    نموذج {structure?.id}
                    <Link to={routes.searchForms}>search</Link>
                </div>

                <div className="card-body">
                    <Fields fields={structure?.array_of_fields.fields} type='render' />

                    {/* {
                        structure?.array_of_fields.fields.map((field, index) => (
                            <div key={index} className='list-group mb-5'>
                                <div className="list-group-item">

                                </div>
                            </div>
                        ))
                    } */}

                    <form action="{{ route('generateForm', ['form_structure_id' => $structure->id]) }}" method="get">
                        <input type="submit" value="انشاء نسخة نموذج" />
                    </form>
                </div>

            </div>
        </div>
    )
}