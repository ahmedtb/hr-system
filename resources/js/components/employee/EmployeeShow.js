import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import { useParams, Link } from 'react-router-dom';

export default function EmployeeShow(props) {

    const { id } = useParams();
    const [employee, setemployee] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getEmployee.replace(':id', id)).then((response) => {
            setemployee(response.data)
            console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    موظف رقم {employee?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        
                    </div>

                </div>

            </div>
        </div>
    )
}