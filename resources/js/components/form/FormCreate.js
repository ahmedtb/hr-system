import React from 'react';
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import Fields from '../fields/Fields';
import { useParams } from 'react-router';

export default function FormCreate(props) {
    const { access_token } = useParams()

    const [structure, setstructure] = React.useState(null)
    const [fields, setfields] = React.useState(null)
    async function getGeneratedForm() {
        try {
            const response = await axios.get(ApiEndpoints.getGeneratedForm.replace(':access_token', access_token))
            setstructure(response.data)
            setfields(response.data.array_of_fields.fields)
        } catch (err) {
            logError(err)
        }
    }

    async function submit(){
        try {
            structure.array_of_fields.fields = fields
            const response = await axios.post(ApiEndpoints.submitForm,{
                fields: structure.array_of_fields,
                access_token: access_token
            })
            console.log(response.data)
        } catch (err) {
            logError(err)
        }
    }

    React.useEffect(() => {
        getGeneratedForm()
    }, [])
    return (
        <div className="col-md-12">


            <div className="card">
                <div className="card-header">
                    نسخة نموذج للنوع {structure?.id}
                </div>

                <div className="card-body">
                    <Fields fields={fields} setFields={setfields} type='input' />

                    <button onClick={submit}>
                        submit
                    </button>
                </div>



            </div>
        </div>
    )
}

