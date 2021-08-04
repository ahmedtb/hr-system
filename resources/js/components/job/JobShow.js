import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import { useParams, Link } from 'react-router-dom';
import routes from '../utility/routesEndpoints';
import EmployeesTable from '../partials/EmployeesTable'
import Pagination from '../utility/Pagination'

export default function JobShow(props) {

    const { id } = useParams();
    const [job, setjob] = React.useState(null)
    const [employees, setemployees] = React.useState([])
    const [employeeslinks, setemployeeslinks] = React.useState([])

    async function getJob() {
        try {
            const response = await axios.get(ApiEndpoints.getJob.replace(':id', id))
            setjob(response.data)
            console.log(response.data)
        } catch (error) { logError(error) }
    }

    async function getEmployees(link = ApiEndpoints.employeeIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, job_id: id, page_size: 5 } })
            setemployees(response.data.data)
            setemployeeslinks(response.data.links)
            console.log(response.data)
        } catch (error) { logError(error) }
    }

    React.useEffect(() => {
        getJob()
        getEmployees()
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    وظيفة رقم {job?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            اسم الوظيفة: {job?.name}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            وصف الوظيفة: {job?.description}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            الغرض من الوظيفة: {job?.purpose}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            الوحدة التي تتبعها
                            <Link to={routes.showUnit.replace(':id', job?.unit_id)}>
                                {job?.unit?.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    موظفيين الذين ينتمون لهذا المسمى الوظيفي
                </div>

                <div className="card-body">
                    <Pagination fetchPage={getEmployees} links={employeeslinks} />
                    <EmployeesTable employees={employees} />
                </div>
            </div>

        </div>
    )
}