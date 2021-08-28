import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';
import CoursesTable from './components/CoursesTable'
import RenderDocuments from '../components/RenderDocuments'

export default function EmployeeShow(props) {

    const { id } = useParams();
    const [employee, setemployee] = React.useState(null)
    const [coach, setcoach] = React.useState(null)

    const [resumedCourses, setresumedCourses] = React.useState([])
    const [doneCourses, setdoneCourses] = React.useState([])
    const [plannedCourses, setplannedCourses] = React.useState([])
    const [canceledCourses, setcanceledCourses] = React.useState([])

    const [trialPeriodAssessments, settrialPeriodAssessments] = React.useState([])
    const [trainingPeriodAssessments, settrainingPeriodAssessments] = React.useState([])
    const [traineeCourseAssessments, settraineeCourseAssessments] = React.useState([])

    async function getEmployeeInfo() {
        try {
            const response = await axios.get(ApiEndpoints.getEmployee.replace(':id', id))
            setemployee(response.data.employee)
            setcoach(response.data.coach)
            setresumedCourses(response.data.resumedCourses)
            setdoneCourses(response.data.doneCourses)
            setplannedCourses(response.data.plannedCourses)
            setcanceledCourses(response.data.canceledCourses)

            settrialPeriodAssessments(response.data.trialPeriodAssessments)
            settrainingPeriodAssessments(response.data.trainingPeriodAssessments)
            settraineeCourseAssessments(response.data.traineeCourseAssessments)
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
                <div className="card-header row">
                    <div>المستندات الملحق بالموظف</div>
                    <Link to={{
                        pathname: routes.attachDocument, state: { documentable: employee, type: 'App\\Models\\Employee' }
                    }}>الحاق مستند جديد</Link>
                </div>

                <div className="card-body">
                    <div className="row">

                        <RenderDocuments
                            documentable_id={id}
                            documentable_type='App\Models\Employee'
                        />

                    </div>

                </div>
            </div >
            
            {
                resumedCourses.length ? (
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
                ) : null
            }

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
                        <Link to={routes.TrainingPeriodAssessmentIndex + '?employee_id=' + id}>
                            تقييمات فترة التدريب للموظف {employee?.training_period_assessments.length}
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.interviewAssessmentIndex + '?name=' + employee?.name}>
                            تقييمات المقابلة التي تخص الموظف
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.TraineeCourseAssessmentIndex + '?employee_id=' + id}>
                            تقييمات الموظف للدورات التي مر بها {traineeCourseAssessments.length}
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.coursesBrowser + '?resumed=true&employee_id=' + id}>
                            الدورات الجارية المسجل بها {resumedCourses.length}
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.coursesBrowser + '?done=true&employee_id=' + id}>
                            الدورات المنتهية المسجل بها {doneCourses.length}
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.coursesBrowser + '?canceled=true&employee_id=' + id}>
                            الدورات الملغية المسجل بها {canceledCourses.length}
                        </Link>
                    </div>
                    <div className="col-5 border border-dark rounded m-2 text-center">
                        <Link to={routes.coursesBrowser + '?planned=true&employee_id=' + id}>
                            الدورات المخطط له المسجل بها {plannedCourses.length}
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}