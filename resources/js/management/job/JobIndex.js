import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import JobsTable from '../components/JobsTable';
import Pagination from '../components/Pagination'
import { TextFilter } from '../components/Filters'
import AllowedLink from '../components/AllowedLink';

export default function JobIndex(props) {
    const [jobs, setjobs] = React.useState([])
    const [links, setlinks] = React.useState(null)
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.jobIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, page_size: 5 } })
            setjobs(response.data.data)
            setlinks(response.data.links)
            setparams({ ...params, page_size: 5 })
            console.log(response.data)
        } catch (error) { logError(error) }
    }

    React.useEffect(() => {
        fetchPage()
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <h3 className="card-header">
                    <div className="row justify-content-between">
                        <div>
                            قائمة الوظائف
                        </div>
                        <div>
                            <AllowedLink to={routes.jobCreate}>تسجيل نوع وظائف جديد</AllowedLink>
                        </div>
                    </div>
                </h3>
                <div className="card-body">
                    <div className="row align-items-start">
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.jobIndex, newparams)}
                            property={'name'}
                            label={'اسم الوظيفة'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.jobIndex, newparams)}
                            property={'purpose'}
                            label={'الغرض من الوظيفة'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.jobIndex, newparams)}
                            property={'description'}
                            label={'وصف الوظيفة'}
                        />
                    </div>
                    <Pagination fetchPage={fetchPage} links={links} />

                    <JobsTable jobs={jobs} />
                </div>
            </div>
        </div>
    );
}

