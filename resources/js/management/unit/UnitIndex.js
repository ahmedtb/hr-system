import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import UnitsTable from '../components/UnitsTable';
import Pagination from '../components/Pagination'
import { TextFilter } from '../components/Filters'
import AllowedLink from '../components/AllowedLink';
export default function UnitIndex(props) {
    const [units, setunits] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.unitIndex, params = null) {
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setunits(response.data.data)
            setparams({ ...params, page_size: 5 })
            console.log(response.data)
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
                <div className="card-header">
                    <div className="row justify-content-between">
                        <h4>
                            قائمة الوحدات الادارية
                        </h4>
                        <div>
                            <AllowedLink to={routes.unitCreate}>انشاء وحدة ادارية</AllowedLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row align-items-start">

                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.unitIndex, newparams)}
                            property={'name'}
                            label={'الاسم'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.unitIndex, newparams)}
                            property={'purpose'}
                            label={'الوصف'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(newparams) => fetchPage(ApiEndpoints.unitIndex, newparams)}
                            property={'parent_name'}
                            label={'الوحدة العليا التي تتبعها'}
                        />
                    </div>
                    <UnitsTable units={units} />
                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                </div>
            </div>
        </div>
    );
}

