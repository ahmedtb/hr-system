import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import { Link } from 'react-router-dom'
import Pagination from '../utility/Pagination'
import CoachesTable from './components/CoachesTable';
import { TextFilter } from '../components/Filters'

export default function CoachIndex(props) {
    const [coaches, setcoaches] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getCoaches, params = null) {
        axios.get(link, { params: { ...params } }).then((response) => {
            setcoaches(response.data.data)
            setparams({ ...params })
            if (response.data.links) {
                setlinks(response.data.links)
            } else
                setlinks(null)

        }).catch((error) => logError(error))
    }
    React.useEffect(() => {
        fetchPage()
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">المدربيين</div>
                <div className="card-body">
                    <div className="row align-items-start">

                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoaches, newparams)}
                            property={'speciality'}
                            label={'تخصص المدرب'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoaches, newparams)}
                            property={'CV'}
                            label={'السيرة الذاتية'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.getCoaches, newparams)}
                            property={'name'}
                            label={'اسم المدرب'}
                        />
                    </div>

                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                    <CoachesTable coaches={coaches} />
                </div>
            </div>
        </div>
    );
}

