import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';
import CoursesTable from './components/CoursesTable'
import TrialPeriodAssessmentTable from '../partials/TrialPeriodAssessmentsTable'
import TrainingPeriodAssessmentsTable from '../partials/TrainingPeriodAssessmentsTable'
import TraineeCourseAssessmentsTable from '../partials/traineeCourseAssessmentsTable'

export default function EmployeeShow(props) {

    const { id } = useParams();
    const [employee, setemployee] = React.useState(null)
    const [coach, setcoach] = React.useState(null)

    const [resumedCourses, setresumedCourses] = React.useState([])
    const [trialPeriodAssessments, settrialPeriodAssessments] = React.useState([])
    const [trainingPeriodAssessments, settrainingPeriodAssessments] = React.useState([])
    const [traineeCourseAssessments, settraineeCourseAssessments] = React.useState([])

    async function getEmployeeInfo() {
        try {
            const response = await axios.get(ApiEndpoints.getEmployee.replace(':id', id))
            setemployee(response.data.employee)
            setcoach(response.data.coach)
            setresumedCourses(response.data.resumedCourses)
            settrialPeriodAssessments(response.data.trialPeriodAssessments)
            settrainingPeriodAssessments(response.data.trainingPeriodAssessments)
            settraineeCourseAssessments(response.data.traineeCourseAssessments)

            console.log(response.data)
        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        getEmployeeInfo()
        // getEmployeeResumedCourses()
    }, [])

    return (
        <div className="col-12">

            <div className="card">
                <div className="card-header">
                    موظف رقم {employee?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            عنوان الموظف {employee?.address}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            مرتبه {employee?.basic_salary}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            ايميله {employee?.email}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تاريخ توظيفه {employee?.employment_date}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            وظيفته <Link to={routes.showJob.replace(':id', employee?.job.id)}>{employee?.job.name}</Link >
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            الاسم {employee?.name}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            رقم الهاتف {employee?.phone_number}
                        </div>
                        {
                            coach ? (
                                <div className="col-5 border border-dark rounded m-2 text-center">
                                    الموظف كمدرب 
                                    <Link to={''} >{coach.id}</Link>
                                </div>
                            ) : null
                        }
                    </div>

                </div>

            </div>

            <div className="card">

                <div className="card-header">
                    الدورات الجارية المسجل بها
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">
                        <CoursesTable courses={resumedCourses} />
                    </div>
                </div>
            </div>
            <div className="card">

                <div className="card-header">
                    تقييمات الفترة التجريبية للموظف
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">
                        <TrialPeriodAssessmentTable trialPeriods={trialPeriodAssessments} />
                    </div>
                </div>
            </div>
            <div className="card">

                <div className="card-header">
                    تقييمات الفترة التدريبية للموظف
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">
                        <TrainingPeriodAssessmentsTable trialPeriods={trainingPeriodAssessments} />
                    </div>
                </div>
            </div>
            <div className="card">

                <div className="card-header">
                    تقييمات الموظف للدورات التي مرة بها
                </div>
                <div className="card-body">
                    <div className="row justify-content-center warp">
                        <TraineeCourseAssessmentsTable traineeCourses={traineeCourseAssessments} />
                    </div>
                </div>
            </div>

            <div className="card-header">
                عمليات تخص الموظف
            </div>

            <div className="card-body">
                <div className="row justify-content-center warp">

                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.TrialPeriodAssessmentIndex + '?employee_id=' + id}>
                            تقييمات فترة التجريب للموظف {employee?.trial_period_assessments.length}
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        تقييمات فترة التدريب {employee?.training_period_assessments.length}
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        تقييمات المقابلة التي تخص الموظف
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        تقيممات الدورات التي قام بها الموظف
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        الدورات الجارية المسجل بها
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        الدورات المنتهية المسجل بها
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        الدورات الملغية المسجل بها
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        الدورات المخطط له والمسجل بها
                    </div>
                </div>

            </div>

        </div>
    )
}