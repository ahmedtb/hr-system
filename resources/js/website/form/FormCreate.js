import React from 'react';
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import Fields from '../components/fields/Fields';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet'

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

    async function submit() {
        try {
            structure.array_of_fields.fields = fields
            // console.log('array_of_fields', structure.array_of_fields)
            const response = await axios.post(ApiEndpoints.submitForm, {
                fields: structure.array_of_fields,
                access_token: access_token
            })
            console.log(response.data)

            // setredirect(true)

        } catch (err) {
            logError(err)
        }
    }

    React.useEffect(() => {
        getGeneratedForm()
    }, [])

    // const [redirect, setredirect] = React.useState(false)
    // if (redirect) {
    //     return <Redirect to={routes.dashboard} />;
    // }
    return (
        <div className="col-md-12 pb-5">
            <Helmet>
                <title>{structure?.type}</title>
            </Helmet>
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center">
                        {structure?.type}
                    </h2>

                    <div className="row">
                        <Fields fields={fields} setFields={setfields} type='input' />
                    </div>

                    <button className="btn btn-success" onClick={submit}>
                        ارسال
                    </button>
                </div>

            </div>
        </div>
    )
}

