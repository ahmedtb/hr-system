import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import { useParams, Link } from 'react-router-dom';

export default function TargetedShow(props) {

    const { id } = useParams();
    const [targeted, settargeted] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getTargeted.replace(':id', id)).then((response) => {
            settargeted(response.data)
            console.log(response.data)
            console.log(ApiEndpoints.getTargeted.replace(':id', id))
        }).catch((err) => { logError(err) })
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    المستهدف رقم {targeted?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        name: {targeted?.name}
                    </div>

                </div>

            </div>
        </div>
    )
}