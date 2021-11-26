import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Redirect } from 'react-router-dom';
import EmployeesTable from '../components/EmployeesTable'
import JobsTable from '../components/JobsTable'
import Pagination from '../components/Pagination'
import AllowedLink from '../components/AllowedLink'
import CustomModal from '../components/CustomModal'
import EditUnitModal from './components/EditUnitModal'


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
            console.log('UnitsShow getunit', response.data)

        } catch (error) { logError(error) }
    }

    async function getUnitJobs(link = ApiEndpoints.jobIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, unit_id: id, page_size: 5 } })
            setjobs(response.data.data)
            setjobslinks(response.data.links)
            // console.log('UnitShow getUnitJobs',response.data)
        } catch (error) { logError(error) }
    }

    async function getUnitEmployees(link = ApiEndpoints.employeeIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, unit_id: id, page_size: 5 } })
            setemployees(response.data.data)
            setemployeeslinks(response.data.links)
            // console.log('UnitShow getUnitEmployees',response.data)

        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        getunit()
        getUnitEmployees()
        getUnitJobs()
    }, [id])



    async function deleteUnit() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteUnit.replace(':id', unit.id))
            console.log('UnitsShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.unitIndex} />;
    }


    return (
        <div className="col-12">

            <div className="card">
                <div className="card-header">
                    <div className='d-flex flex-row justify-content-between'>

                        <h4>الوحدة الادارية رقم {unit?.id}</h4>
                        <div>

                            <CustomModal buttonClass="btn btn-info mr-2" label={'حدف الوحدة'} >
                                <div>
                                    هل تود فعلا حدف الوحدة بشكل دائما؟
                                </div>
                                <button className="btn btn-secondary" onClick={deleteUnit} data-dismiss="modal">نعم</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>

                            </CustomModal>

                            <EditUnitModal unit={unit} change={getunit} />
                        </div>

                    </div>
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            اسم الوحدة الادارية: {unit?.name}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            الغرض من الوحدة: {unit?.purpose}
                        </div>
                        {
                            unit?.parent ? (
                                <div className="col-5 border border-dark rounded m-2 text-center">
                                    الوحدة الاعلى التي تتبعها
                                    <AllowedLink to={routes.showUnit.replace(':id', unit?.parent_id)}>
                                        {unit?.parent?.name}
                                    </AllowedLink>
                                </div>
                            ) : null
                        }

                        {
                            unit?.head ? (
                                <div className="col-5 border border-dark rounded m-2 text-center">
                                    رئيس الوحدة
                                    <AllowedLink to={routes.showUnit.replace(':id', unit?.head.id)}>
                                        {unit?.head?.name}
                                    </AllowedLink>
                                </div>
                            ) : null
                        }

                    </div>





                </div>

                <div className="card">
                    <h4 className="card-header">
                        موظفي الوحدة الادارية
                    </h4>

                    <div className="card-body">
                        <Pagination fetchPage={getUnitEmployees} links={employeeslinks} />
                        <EmployeesTable employees={employees} />
                    </div>
                </div>

                <div className="card">
                    <h4 className="card-header">
                        الوظايف التي تنتمي لهذه الوحدة
                    </h4>

                    <div className="card-body">
                        <Pagination fetchPage={getUnitJobs} links={jobslinks} />
                        <JobsTable jobs={jobs} />
                    </div>
                </div>


            </div>
        </div>
    )
}