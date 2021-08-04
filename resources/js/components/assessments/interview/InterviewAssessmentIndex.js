import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import InterviewAssessmentsTable from '../../partials/InterviewAssessmentsTable'
import { Link } from 'react-router-dom'
import Pagination from '../../utility/Pagination'

export default function InterviewAssessmentIndex() {
    const [interviews, setinterviews] = React.useState(null)
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getInterviewAssessments, params = null) {
        axios.get(link, { params: params }).then((response) => {
            setinterviews(response.data.data)
            setparams(params)
            console.log(response.data)
            if (response.data.links) { setlinks(response.data.links) } else { setlinks(null) }

        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));
        fetchPage(ApiEndpoints.getInterviewAssessments, params)
    }, [])

    React.useEffect(() => {
        setname(params.name)
    }, [params])

    const [name, setname] = React.useState(params.name)

    return (
        <div className="col-md-12">

            <div className="card">


                <div className="card-header">
                    <div className="row justify-content-between">
                        <div>
                            تقييمات المقابلات
                        </div>
                        <div>
                            <Link to={routes.conductInterviewAssessment}>اجراء تقييم مقابلة</Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">

                    <div className="row align-items-start">

                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#filteringBy">
                            ترشيح المقابلات وفقا لـ
                        </button>
                        <div className="modal fade" id="filteringBy" tabIndex="-1" aria-labelledby="filteringByLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="filteringByLabel">ترشيح الدورات وفقا لــ</h5>
                                    </div>
                                    <div className="modal-body row">

                                        <button type="button" className={(params?.orderByDesc == 'look') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getInterviewAssessments, { orderByDesc: 'look' })}>حسن المظهر</button>

                                    </div>
                                    <div className="modal-footer">
                                        <button value={name} type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded ml-2 p-2">
                            <strong>البحث بالاسم</strong>
                            <input value={name??''} className="form-control" type="text" onChange={(e) => setname(e.target.value)}/>
                            <button type="button" className="btn btn-success" onClick={
                                () => fetchPage(ApiEndpoints.getInterviewAssessments, {name:name})
                            }>بحث</button>
                            
                        </div>


                    </div>
                    <div className="">
                        <Pagination fetcPage={fetchPage} links={links} />

                        <InterviewAssessmentsTable interviews={interviews} />
                    </div>

                </div>
            </div>
        </div>

    )
}