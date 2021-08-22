import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError';
import Pagination from '../utility/Pagination';

import EmployeesTable from '../partials/EmployeesTable';
import { TextFilter, JobFilter, OrderByDescFilter, DateFilter } from '../components/Filters';

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
                <div className="card-header">قائمة الموظفيين</div>
                <div className="card-body">
                    <div className="col-2 border border-primary rounded row align-items-center m-2" data-toggle="collapse" href="#filtersCollapse" role="button" aria-expanded="false" aria-controls="filtersCollapse">
                        <div className="mx-1">
                            ترشيح الموظفيين
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                        </svg>
                    </div>
                    <div className="collapse" id="filtersCollapse">
                        <div className="card card-body my-2 bg-light">


                            <div className="col-3row align-self-end ">

                                <button className="mx-1 btn btn-primary" onClick={clearFilters}>
                                    امسح كل عوامل التصفية
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace" viewBox="0 0 16 16">
                                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="row">
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
                            </div>
                        </div>
                    </div>

                    <EmployeesTable employees={employees} />
                    <Pagination fetchPage={fetchPage} links={links} />
                </div>
            </div>
        </div >
    );
}

