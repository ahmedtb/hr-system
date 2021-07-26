import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import TrialPeriodAssessmentsTable from '../partials/TrialPeriodAssessmentsTable'
import TrainingPeriodAssessmentsTable from '../partials/TrainingPeriodAssessmentsTable'
import TraineeCourseAssessmentsTable from '../partials/TraineeCourseAssessmentsTable'
import CoachCourseAssessmentsTable from '../partials/CoachCourseAssessmentsTable'
import InterviewAssessmentsTable from '../partials/InterviewAssessmentsTable'

import { useParams, Link } from 'react-router-dom';

export default function AssessmentsIndex(props) {

    const { id } = useParams();
    const [trialPeriods, settrialPeriods] = React.useState(null)
    const [trainingPeriods, settrainingPeriods] = React.useState(null)
    const [traineeCourses, settraineeCourses] = React.useState(null)
    const [coachCourses, setcoachCourses] = React.useState(null)
    const [interviews, setinterviews] = React.useState(null)

    React.useEffect(() => {
        axios.get(ApiEndpoints.getTrialPeriods).then((response) => {
            settrialPeriods(response.data.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
        axios.get(ApiEndpoints.getTrainingPeriods).then((response) => {
            settrainingPeriods(response.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
        axios.get(ApiEndpoints.getTraineeCourses).then((response) => {
            settraineeCourses(response.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
        axios.get(ApiEndpoints.getCoachCourses).then((response) => {
            setcoachCourses(response.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
        axios.get(ApiEndpoints.getInterviewAssessments).then((response) => {
            setinterviews(response.data)
            // console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    التقييمات
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="group-list" >

                            <div className="group-list-item" >
                                Trial Period Assessments
                                <TrialPeriodAssessmentsTable trialPeriods={trialPeriods} />
                            </div>

                            <div className="group-list-item" >
                                Training Period Assessments
                                <TrainingPeriodAssessmentsTable trainingPeriods={trainingPeriods} />
                            </div>

                            <div className="group-list-item" >
                                trainee course Assessments
                                <TraineeCourseAssessmentsTable traineeCourses={traineeCourses} />
                            </div>

                            <div className="group-list-item" >
                                Coach Course Assessments
                                <CoachCourseAssessmentsTable coachCourses={coachCourses} />
                            </div>

                            <div className="group-list-item" >
                                interviews Assessments
                                <InterviewAssessmentsTable interviews={interviews} />
                            </div>
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}