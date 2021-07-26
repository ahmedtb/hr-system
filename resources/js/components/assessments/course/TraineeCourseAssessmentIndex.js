import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import TraineeCourseAssessmentsTable from '../../partials/TraineeCourseAssessmentsTable'
import { Link } from 'react-router-dom'
export default function TraineeCourseAssessmentIndex() {

    const [traineeCourses, settraineeCourses] = React.useState(null)
    
    React.useEffect(() => {
        axios.get(ApiEndpoints.getTraineeCourses).then((response) => {
            settraineeCourses(response.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

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

                <div className="card-body">
                    <div className="row justify-content-center">
                        <TraineeCourseAssessmentsTable traineeCourses={traineeCourses} />
                    </div>
                </div>

            </div>
        </div>

    )
}