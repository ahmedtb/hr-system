import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import { Link } from 'react-router-dom'
import CoachCourseAssessmentsTable from '../../partials/CoachCourseAssessmentsTable'
export default function CoachCourseAssessmentIndex() {

    const [coachCourses, setcoachCourses] = React.useState(null)
    
    React.useEffect(() => {
        axios.get(ApiEndpoints.getCoachCourses).then((response) => {
            setcoachCourses(response.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">

                <div className="card-header">
                    احصائيات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <Link to={routes.conductCoachCourseAssessment}>اجراء تقييم مدرب لدورة</Link>
                    </div>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    تقييمات المدربيين للدورات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <CoachCourseAssessmentsTable coachCourses={coachCourses} />
                    </div>
                </div>

            </div>
        </div>

    )
}