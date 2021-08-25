import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError';
import Pagination from '../utility/Pagination';

import EmployeesTable from '../partials/EmployeesTable';
import { TextFilter, JobFilter, OrderByDescFilter, DateFilter } from '../components/Filters';
import FiltersContainer from '../components/FiltersContainer';
import routes from '../utility/routesEndpoints';
import AllowedLink from '../components/AllowedLink';
export default function employeeIndex(props) {
    const [employees, setemployees] = React.useState([])

    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link, params = null) {
        axios.get((link) ?? ApiEndpoints.employeeIndex,
            { params: { ...params, page_size: 5 } }
        ).then((response) => {
            setemployees(response.data.data)
            setparams({ ...params, page_size: 5 })
            console.log('employee index', response.data)
            if (response.data.links) {
                setlinks(response.data.links)
            } else
                setlinks(null)

        }).catch((error) => logError(error))
    }

    async function clearFilters() {
        fetchPage(ApiEndpoints.employeeIndex, null)
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
                            قائمة الموظفيين
                        </div>
                        <div>
                            <AllowedLink to={routes.createEmployeeForm}>تسجيل موظف</AllowedLink>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <FiltersContainer label="ترشيح الموظفيين" clearFilters={clearFilters}>
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'name'}
                            label={'بحث بالاسم'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'phone_number'}
                            label={'بحث برقم الهاتف'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'email'}
                            label={'ترشيح بالبريد'}
                        />
                        <TextFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'address'}
                            label={'ترشيح بعنوان الموظف'}
                        />
                        <JobFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'job_id'}
                            label={'بحث بالوظيفة'}
                        />
                        <OrderByDescFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'basic_salary'}
                            label={'ترتيب بالمرتب'}
                        />
                        <OrderByDescFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'employment_date'}
                            label={'ترتيب بتاريخ التوظيف'}
                        />
                        <DateFilter
                            params={params}
                            fetchPage={(alteredparams) => fetchPage(ApiEndpoints.employeeIndex, alteredparams)}
                            property={'employment_date'}
                            label={'فلترة بتاريخ التوظيف'}
                        />
                    </FiltersContainer>

                    <div className="col-12">
                        <EmployeesTable employees={employees} />
                    </div>
                    <Pagination fetchPage={fetchPage} links={links} />
                </div>
            </div>
        </div >
    );
}

