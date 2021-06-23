import React from 'react'
import { useParams } from 'react-router-dom'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import Fields from '../fields/Fields'

export default function FormView() {
    const { id } = useParams()
    const [form, setForm] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.showForm.replace(':id', id)).then((response) => {
            setForm(response.data)
        }).catch((err) => logError(err))
    }, [])
    return (
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">نموذج {form?.id}</div>

                <div className="card-body">
                    <Fields fields={form?.filled_fields.fields} type='render'/>
                    {/* <div className="list-group">
                        {
                            form?.filled_fields.fields.map((field, index) => (
                                <div key={index} className="list-group-item">
                                </div>
                            ))
                        }
                    </div> */}

                </div>

            </div>
        </div>
    )
}