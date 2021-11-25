import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import FormsTable from '../components/FormsTable'
export default function FormsIndex() {
    const [forms, setForms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.showForms).then((response) => {
            setForms(response.data)
        }).catch((err) => logError(err))
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <h4 className="card-header">النماذج المعبئة</h4>

                <div className="card-body">
                    <FormsTable forms={forms}/>
                </div>

            </div>
        </div>
    )
}