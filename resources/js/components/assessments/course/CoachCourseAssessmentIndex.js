import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import { Link } from 'react-router-dom'
import CoachCourseAssessmentsTable from './components/CoachCourseAssessmentsTable'
import Pagination from '../../utility/Pagination'
export default function CoachCourseAssessmentIndex() {

    const [coachCourses, setcoachCourses] = React.useState(null)

    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getCoachCourses, params = null) {
        axios.get(link, { params: params }).then((response) => {
            setcoachCourses(response.data.data)
            setparams(params)
            console.log(response.data)
            if (response.data.links) { setlinks(response.data.links) } else { setlinks(null) }

        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.getCoachCourses, params)
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">

                <div className="card-header">
                    <div className="row justify-content-between">
                        <div>
                            تقييمات المدربين للدورات
                        </div>
                        <div>
                            <Link to={routes.conductCoachCourseAssessment}>اجراء تقييم مدرب لدورة</Link>
                        </div>
                    </div>
                </div>


                <div className="card-body">


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

                                        <button type="button" className={(params?.orderByDesc == 'trainees_discipline') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getCoachCourses, { orderByDesc: 'trainees_discipline' })}>انضباط المتدربيين</button>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="">
                        <CoachCourseAssessmentsTable coachCourses={coachCourses} />
                        <Pagination fetcPage={fetchPage} links={links} />

                    </div>
                </div>

            </div>
        </div>


    )
}