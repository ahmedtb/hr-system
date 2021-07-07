import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import InterviewAssessmentsTable from '../../partials/InterviewAssessmentsTable'
import { Link } from 'react-router-dom'
export default function InterviewAssessmentIndex() {
    const [interviews, setinterviews] = React.useState(null)

    React.useEffect(() => {
        axios.get(ApiEndpoints.getInterviewAssessments).then((response) => {
            setinterviews(response.data)
        }).catch((err) => logError(err))
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">

                <div className="card-header">
                    احصائيات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <Link to={routes.conductInterviewAssessment}>اجراء تقييم المقابلة</Link>
                    </div>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    تقييمات المقابلات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <InterviewAssessmentsTable interviews={interviews} />
                    </div>
                </div>

            </div>
        </div>

    )
}