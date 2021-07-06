import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import { useParams, Link } from 'react-router-dom';
import routes from '../utility/routesEndpoints';

export default function JobShow(props) {

    const { id } = useParams();
    const [job, setjob] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getJob.replace(':id', id)).then((response) => {
            setjob(response.data)
            console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    وظيفة رقم {job?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="group-list" >
                            <div className="group-list-item" >
                                name {job?.name}
                            </div>
                            <div className="group-list-item" >
                                description {job?.description}
                            </div>
                            <div className="group-list-item" >
                                purpose {job?.purpose}
                            </div>
                            <div className="group-list-item" >
                                name {job?.name}
                            </div>
                            <div className="group-list-item" >
                                unit
                                <Link to={routes.showUnit.replace(':id', job?.unit?.id)}>
                                    {job?.unit?.name}
                                </Link>
                            </div>

                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}