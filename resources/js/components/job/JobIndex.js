import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import JobsTable from '../partials/JobsTable';
import Pagination from '../utility/Pagination'

export default function JobIndex(props) {
    const [jobs, setjobs] = React.useState([])
    const [links, setlinks] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.jobIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, page_size: 5 } })
            setjobs(response.data.data)
            setlinks(response.data.links)
            console.log(response.data)
        } catch (error) { logError(error) }
    }

    React.useEffect(() => {
        fetchPage()
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">قائمة الوظائف</div>
                <div className="card-body">
                    <Pagination fetchPage={fetchPage} links={links} />

                    <JobsTable jobs={jobs} />
                </div>
            </div>
        </div>
    );
}

