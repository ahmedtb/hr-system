import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';
import EmployeesTable from '../partials/EmployeesTable'
import JobsTable from '../partials/JobsTable'
import Pagination from '../utility/Pagination'
export default function UnitShow(props) {

    const { id } = useParams();
    const [unit, setunit] = React.useState(null)
    const [jobs, setjobs] = React.useState([])
    const [jobslinks, setjobslinks] = React.useState([])

    const [employees, setemployees] = React.useState([])
    const [employeeslinks, setemployeeslinks] = React.useState([])

    async function getunit() {
        try {
            const response = await axios.get(ApiEndpoints.unitShow.replace(':id', id))
            setunit(response.data)
        } catch (error) { logError(error) }
    }

    async function getUnitJobs(link = ApiEndpoints.jobIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, unit_id: id, page_size: 5 } })
            setjobs(response.data.data)
            setjobslinks(response.data.links)
            console.log(response.data)
        } catch (error) { logError(error) }
    }

    async function getUnitEmployees(link = ApiEndpoints.employeeIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, unit_id: id, page_size: 5 } })
            setemployees(response.data.data)
            setemployeeslinks(response.data.links)
            console.log(response.data)

        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        getunit()
        getUnitEmployees()
        getUnitJobs()
    }, [])

    return (
        <div className="col-12">

            <div className="card">
                <div className="card-header">
                    الوحدة الادارية رقم {unit?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            اسم الوحدة الادارية: {unit?.name}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            الغرض من الوحدة: {unit?.purpose}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            الوحدة الاعلى التي تتبعها
                            <Link to={routes.showUnit.replace(':id', unit?.parent_id)}>
                                {unit?.parent?.name}
                            </Link>
                        </div>
                    </div>





                </div>

                <div className="card">
                    <div className="card-header">
                        موظفي الوحدة الادارية
                    </div>

                    <div className="card-body">
                        <Pagination fetchPage={getUnitEmployees} links={employeeslinks} />
                        <EmployeesTable employees={employees} />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        الوظايف التي تنتمي لهذه الوحدة
                    </div>

                    <div className="card-body">
                        <Pagination fetchPage={getUnitJobs} links={jobslinks} />
                        <JobsTable jobs={jobs} />
                    </div>
                </div>


            </div>
        </div>
    )
}