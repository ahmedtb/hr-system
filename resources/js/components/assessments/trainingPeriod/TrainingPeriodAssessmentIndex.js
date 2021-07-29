import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import { Link } from 'react-router-dom'
import TrainingPeriodAssessmentsTable from './components/TrainingPeriodAssessmentsTable'
import Pagination from '../../utility/Pagination'

function Filters(props) {
    const fetchPage = props.fetchPage

    return (

        <div className="card">

            <div className="card-header">
                filters
            </div>

            <div className="card-body">
                <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'final_degree' })}>افضل الدرجة الكلية</button>
                <button onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { orderByDesc: 'excitement' })}>الافضل في الحماسة</button>

            </div>

        </div>
    )
}

export default function TrainingPeriodAssessmentIndex() {

    const [trainingPeriods, settrainingPeriods] = React.useState(null)
    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getTrainingPeriods, params = null) {
        axios.get(link, { params: params }).then((response) => {
            settrainingPeriods(response.data.data)
            console.log(response.data)
            if (response.data.links) { setlinks(response.data.links) } else { setlinks(null) }

        }).catch((error) => logError(error))
    }

    React.useEffect(() => { 
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.getTrainingPeriods, params) 
    }, [])

    return (
        <div className="col-md-12">

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

            <Filters fetchPage={fetchPage} />

            <div className="card">

                <div className="card-header">
                    تقييمات فترة التدريب
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <Pagination fetchPage={fetchPage} links={links} />
                        <TrainingPeriodAssessmentsTable trainingPeriods={trainingPeriods} />
                    </div>
                </div>

            </div>
        </div>

    )
}