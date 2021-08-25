import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import { Link } from 'react-router-dom'
import Pagination from '../utility/Pagination'
import CoachesTable from './components/CoachesTable';
import { TextFilter } from '../components/Filters'
import FiltersContainer from '../components/FiltersContainer';
import AllowedLink from '../components/AllowedLink';
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
    async function clearFilters() {
        fetchPage(ApiEndpoints.getCoaches, null)
    }

    React.useEffect(() => {
        fetchPage()
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <div className="row justify-content-between">
                        <div>
                            المدربيين
                        </div>
                        <div>
                            <AllowedLink to={routes.createCoachForm}>تسجيل مدرب</AllowedLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <FiltersContainer label="ترشيح المدربيين" clearFilters={clearFilters}>
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
                    </FiltersContainer>

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

