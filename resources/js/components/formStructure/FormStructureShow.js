import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints'
import logError from '../utility/logError'

import Fields from '../fields/Fields'
import { useParams, Link } from 'react-router-dom';

export default function FormStructureShow(props) {

    const { id } = useParams();
    const [structure, setStructure] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.showFormStructure.replace(':id', id)).then((response) => {
            setStructure(response.data)
        }).catch(() => {

        })
    }, [])

    const [link, setlink] = React.useState(null)
    async function generateForm() {
        try {
            const res = await axios.post(ApiEndpoints.generateForm, {
                'form_structure_id': structure.id
            })
            setlink(routes.generatedForm.replace(':access_token', res.data))
            console.log(res.data)
        } catch (err) {
            logError(err)
        }
    }

    return (
        <div className="col-md-12">

            <div className='card'>
                <div className="card-body">

                    <Link to={link ?? ''}>{link ?? ''}</Link>

                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    نموذج {structure?.id}
                    <Link to={routes.searchForms.replace(':form_structure_id', structure?.id)}>search</Link>
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <h1 className='align-self-center'>{structure?.type}</h1>
                    </div>
                    <div className="row">
                        <Fields fields={structure?.array_of_fields.fields} type='render' />
                    </div>
                    <button onClick={generateForm}>
                        انشاء نسخة نموذج
                    </button>
                </div>

            </div>
        </div>
    )
}