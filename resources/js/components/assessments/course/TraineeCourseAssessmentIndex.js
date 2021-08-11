import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import TraineeCourseAssessmentsTable from './components/TraineeCourseAssessmentsTable'
import { Link } from 'react-router-dom'
import Pagination from '../../utility/Pagination'

function Filters(props) {
    const fetchPage = props.fetchPage
    const params = props.params

    const [employees, setemployees] = React.useState(null)
    const [employee_id, setemployee_id] = React.useState(null)

    async function getEmployees() {
        axios.get(ApiEndpoints.getEmployees).then((response) => {
            setemployees(response.data)
        }).catch((err) => logError(err))
    }

    React.useEffect(() => {
        getEmployees()
    }, [])

    return (

        <div className="row align-items-start">

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#filteringBy">
                ترشيح الدورات وفقا لـ
            </button>
            <div className="modal fade" id="filteringBy" tabIndex="-1" aria-labelledby="filteringByLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filteringByLabel">ترشيح الدورات وفقا لــ</h5>
                        </div>
                        <div className="modal-body row">

                            <button type="button" className={(params?.orderByDesc == 'coach_understanding') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTraineeCourses, { orderByDesc: 'coach_understanding' })}>فهم المدرب</button>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="border rounded p-1 mx-2">
                <div className="d-flex flex-row my-2 align-items-center">
                    <strong>تقييمات الموظف:</strong><br />
                    <select className="form-control" onChange={(e) => setemployee_id(e.target.value)} name="employee_id">
                        <option value=''>select employee name</option>
                        {
                            employees?.map((employee, index) => (
                                <option key={index} value={employee.id}>{employee.name}</option>
                            ))
                        }
                    </select>

                    <button type="button" className="btn btn-primary" onClick={() => {
                        let params = Object.assign({},
                            employee_id === null ? null : { employee_id },
                        )
                        fetchPage(ApiEndpoints.getTraineeCourses, params)
                    }}>ترشيح</button>
                </div>

            </div>
        </div>

    )
}

export default function TraineeCourseAssessmentIndex() {

    const [traineeCourses, settraineeCourses] = React.useState(null)

    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getTraineeCourses, params = null) {
        axios.get(link, { params: params }).then((response) => {
            settraineeCourses(response.data.data)
            setparams(params)
            console.log(response.data)
            if (response.data.links) { setlinks(response.data.links) } else { setlinks(null) }

        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.getTraineeCourses, params)
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">

                <div className="card-header">
                    <div className="row justify-content-between">
                        <div>
                            تقييمات المتدربيين للدورات
                        </div>
                        <div>
                            <Link to={routes.conductTraineeCourseAssessment}>اجراء تقييم متدرب لدورة</Link>
                        </div>
                    </div>
                </div>



                <div className="card-body">
                    <Filters fetchPage={fetchPage} params={params}/>
                    <div className="row justify-content-center">

                        <div className="col-12">
                            <TraineeCourseAssessmentsTable traineeCourses={traineeCourses} />
                        </div>
                        <Pagination fetchPage={fetchPage} links={links} />
                    </div>
                </div>

            </div>
        </div>

    )
}