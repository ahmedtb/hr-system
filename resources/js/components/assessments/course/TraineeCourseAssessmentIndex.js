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

        <div className="card">

            <div className="card-header">
                filters
            </div>

            <div className="card-body">
                <button onClick={() => fetchPage(ApiEndpoints.getTraineeCourses, { orderByDesc: 'coach_understanding' })}>فهم المدرب</button>

                <div>
                    <strong>تقييمات الموظف:</strong><br />
                    <label className="form-check-label" >الموظف</label><br />
                    <li className="list-group-item">
                        <label htmlFor="employee">اختر الموظف</label>
                        <select onChange={(e) => setemployee_id(e.target.value)} name="employee_id">
                            <option value=''>select employee name</option>
                            {
                                employees?.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))
                            }
                        </select>
                    </li>
                    <button onClick={() => {
                        let params = Object.assign({},
                            employee_id === null ? null : { employee_id },
                        )
                        fetchPage(ApiEndpoints.getTraineeCourses, params)
                    }}>filter</button>

                </div>
            </div>

        </div>
    )
}

export default function TraineeCourseAssessmentIndex() {

    const [traineeCourses, settraineeCourses] = React.useState(null)

    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getTraineeCourses, params = null) {
        axios.get(link, { params: params }).then((response) => {
            settraineeCourses(response.data.data)
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
                    احصائيات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <Link to={routes.conductTraineeCourseAssessment}>اجراء تقييم متدرب لدورة</Link>
                    </div>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    تقييمات المدربيين للدورات
                </div>

                <Filters fetchPage={fetchPage} />


                <div className="card-body">
                    <div className="row justify-content-center">
                        <Pagination fetchPage={fetchPage} links={links} />

                        <TraineeCourseAssessmentsTable traineeCourses={traineeCourses} />
                    </div>
                </div>

            </div>
        </div>

    )
}