import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import { Link } from 'react-router-dom'
import TrainingPeriodAssessmentsTable from '../../partials/TrainingPeriodAssessmentsTable'
export default function TrainingPeriodAssessmentIndex() {

    const [trainingPeriods, settrainingPeriods] = React.useState(null)

    React.useEffect(() => {
        axios.get(ApiEndpoints.getTrainingPeriods).then((response) => {
            settrainingPeriods(response.data)
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
                        <Link to={routes.conductTrainingPeriodAssessment}>اجراء تقييم فترة التدريب</Link>
                    </div>
                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    تقييمات فترة التدريب
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                    <TrainingPeriodAssessmentsTable trainingPeriods={trainingPeriods} />
                    </div>
                </div>

            </div>
        </div>

    )
}