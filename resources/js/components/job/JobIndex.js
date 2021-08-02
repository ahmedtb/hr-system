import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import JobsTable from '../partials/JobsTable';

export default function JobIndex(props) {
    const [jobs, setjobs] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.jobIndex).then((response) => {
            setjobs(response.data)
            console.log(response.data)
        }).catch((error) => logError(error))
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">قائمة الموظفيين</div>
                <div className="card-body">
                    <JobsTable jobs={jobs} />
                </div>
            </div>
        </div>
    );
}

