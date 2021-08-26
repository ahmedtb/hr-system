import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints'
import logError from '../utility/logError'

import Fields from '../fields/Fields'
import { useParams, Link } from 'react-router-dom';
import AllowedLink from '../components/AllowedLink'
import { FaSearch } from 'react-icons/fa'
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
                    <div className="d-flex flex-row justify-content-between">
                        <div>نموذج {structure?.id}</div>
                        <div className="">
                            <AllowedLink to={routes.searchForms.replace(':form_structure_id', structure?.id)}>
                                <FaSearch />
                                بحث في النماذج المعبئة
                            </AllowedLink>
                            <button type='button' className='btn btn-primary' onClick={generateForm}>
                                انشاء نسخة من نموذج
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <h1 className='align-self-center'>{structure?.type}</h1>
                    </div>
                    <div className="row">
                        <Fields fields={structure?.array_of_fields.fields} type='render' />
                    </div>

                </div>

            </div>
        </div>
    )
}