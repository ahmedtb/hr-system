import React from 'react'
import { useParams } from 'react-router-dom'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import Fields from '../components/fields/Fields'

export default function FormView() {
    const { id } = useParams()
    const [form, setForm] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.showForm.replace(':id', id)).then((response) => {
            setForm(response.data)
            console.log('formview',response.data)
        }).catch((err) => logError(err))
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <h3 className="card-header">نموذج {form?.id}</h3>

                <div className="card-body">
                    <h1 className='align-self-center'>{form?.structure?.type}</h1>

                    <div className="row">
                        <Fields fields={form?.filled_fields.fields} type='render' />
                    </div>
                </div>

            </div>
        </div>
    )
}