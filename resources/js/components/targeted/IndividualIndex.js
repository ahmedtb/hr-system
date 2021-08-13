import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError';
import Pagination from '../utility/Pagination';
import TargetedIndividualsTable from '../partials/TargetedIndividualsTable';

import { TextFilter, JobFilter, OrderByDescFilter, DateFilter } from '../components/Filters';

export default function IndividualIndex(props) {
    const [individuals, setindividuals] = React.useState([])

    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link, params = null) {
        axios.get((link) ?? ApiEndpoints.individualIndex,
            { params: { ...params, page_size: 5 } }
        ).then((response) => {
            setindividuals(response.data.data)
            setparams({ ...params, page_size: 5 })
            console.log('employee index', response.data)
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
                <div className="card-header">قائمة المستهدفيين</div>
                <div className="card-body">
                    <div className="row">
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'name'}
                            label={'بحث بالاسم'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'phone_number'}
                            label={'بحث برقم الهاتف'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'description'}
                            label={'بحث بوصف المستهدف'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'email'}
                            label={'ترشيح بالبريد'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'address'}
                            label={'ترشيح بعنوان المستهدف'}
                        />
                        <OrderByDescFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'created_at'}
                            label={'ترتيب وفق تاريخ التسجيل'}
                        />
                        <DateFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.individualIndex, alteredparams)}
                            property={'created_at'}
                            label={'فلترة بتاريخ التسجيل'}
                        />
                    </div>
                    <TargetedIndividualsTable individuals={individuals} />
                    <Pagination fetchPage={fetchPage} links={links} />
                </div>
            </div>
        </div >
    );
}

