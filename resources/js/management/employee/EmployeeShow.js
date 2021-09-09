import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link, Redirect } from 'react-router-dom';
import CoursesTable from './components/CoursesTable'
import RenderDocuments from '../components/RenderDocuments'
import Comments from '../components/Comments'
import { FaDiscourse, FaMoneyCheck, FaMailBulk, FaRegCalendar, FaChalkboardTeacher } from 'react-icons/fa'
import { FiFile, FiFlag, FiPhone } from 'react-icons/fi'
import { GrAnalytics } from 'react-icons/gr'
import { IoMdAnalytics } from 'react-icons/io'
import AllowedLink from '../components/AllowedLink'
import CustomModal from '../components/CustomModal'
import EditEmployeeModal from './components/EditEmployee'
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

    const [toggleUI, settoggleUI] = React.useState('documents')

    async function getEmployeeInfo() {
        try {
            const response = await axios.get(ApiEndpoints.getEmployee.replace(':id', id))
            // console.log('employee show', response.data.employee)
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

    const [redirect, setredirect] = React.useState(false)
    async function deleteEmployee() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteEmployee.replace(':id', employee.id))
            console.log('employeeShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }


    React.useEffect(() => {
        getEmployeeInfo()
    }, [])

    if (redirect) {
        return <Redirect to={routes.employeeIndex} />;
    }

    return (
        <div className="col-12">

            <div className="card">
                <div className="card-header row justify-content-between">
                    موظف رقم {employee?.id}
                    <div>
                        <CustomModal buttonClass="btn btn-info mr-2" label={'حدف الموظف من السجلات'} >
                            <div>
                                هل تود فعلا حدف الموظف من السجل بشكل دائما؟
                            </div>
                            <button className="btn btn-secondary" onClick={deleteEmployee} data-dismiss="modal">نعم</button>
                            <button className='btn btn-success' data-dismiss="modal">لا</button>

                        </CustomModal>
                        <EditEmployeeModal employee={employee} change={getEmployeeInfo} />
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">

                        <div className="border rounded p-2">
                            <img height='150' src={'/css/profile.png'} />
                        </div>
                        <div className="col-10 row warp">

                            <div className="col">
                                <div className="m-2 text-center row">
                                    <FiFlag size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        الاسم
                                    </h5>
                                    {employee?.name}
                                </div>

                                <div className="m-2 text-center row">
                                    <FaRegCalendar size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        تاريخ توظيفه
                                    </h5>
                                    {employee?.employment_date}
                                </div>
                                <div className="m-2 text-center row">
                                    <FiPhone size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        رقم الهاتف
                                    </h5>
                                    {employee?.phone_number}
                                </div>
                            </div>
                            <div className="col">

                                <div className="m-2 text-center row">
                                    <FaDiscourse size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        عنوان الموظف:
                                    </h5>
                                    {employee?.address}
                                </div>
                                <div className="m-2 text-center row">
                                    <FaMoneyCheck size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        مرتبه
                                    </h5>
                                    {employee?.basic_salary}
                                </div>
                                <div className="m-2 text-center row">
                                    <FaMailBulk size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        ايميله
                                    </h5>
                                    {employee?.email}
                                </div>
                            </div>

                            {employee?.job_id ? <div className="m-2 text-center row">
                                <FiFile size={25} className="mx-1" />
                                <h5 className="mx-1">
                                    وظيفته
                                </h5>
                                <Link to={routes.showJob.replace(':id', employee?.job_id)}>{employee?.job?.name}</Link >
                            </div> : null}


                            {
                                coach ? (
                                    <div className="m-2 text-center row">
                                        الموظف كمدرب
                                        <Link to={routes.showCoach.replace(':id', coach.id)} >{coach.id}</Link>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>

                </div>

            </div>

            <div className="row justify-content-around">
                <div onClick={() => settoggleUI('documents')} className={"bg-light p-2"}>المستندات</div>
                <div onClick={() => settoggleUI('courses')} className={"bg-light p-2"}> الدورات</div>
                <div onClick={() => settoggleUI('assessments')} className={"bg-light p-2"}>التقييمات</div>
                <div onClick={() => settoggleUI('notes')} className={"bg-light p-2"}>ملاحظات</div>
            </div>
            {

                toggleUI == 'documents' ?
                    <div className="card">
                        <div className="card-header row justify-content-between">
                            <div>المستندات الملحق بالموظف</div>
                            <AllowedLink to={{
                                pathname: routes.attachDocument, state: { documentable: employee, documentable_type: 'App\\Models\\Employee' }
                            }}>الحاق مستند جديد</AllowedLink>
                        </div>

                        <div className="card-body">
                            <div className="row">

                                <RenderDocuments
                                    documentable_id={id}
                                    documentable_type='App\Models\Employee'
                                />

                            </div>

                        </div>
                    </div > : null
            }
            {
                toggleUI == 'courses' && resumedCourses.length ? (
                    <div className="card">

                        <div className="card-header">
                            الدورات
                        </div>

                        <div className="card-body">
                            <div className="row justify-content-center warp">
                                <CoursesTable courses={resumedCourses} />
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                toggleUI == 'courses' ? (
                    <div className="row">
                        <div className="col-4 d-flex flex-row">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?resumed=true&employee_id=' + id}>
                                الدورات الجارية المسجل بها {resumedCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?done=true&employee_id=' + id}>
                                الدورات المنتهية المسجل بها {doneCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?canceled=true&employee_id=' + id}>
                                الدورات الملغية المسجل بها {canceledCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?planned=true&employee_id=' + id}>
                                الدورات المخطط له المسجل بها {plannedCourses.length}
                            </Link>
                        </div>
                    </div>
                ) : null
            }

            {
                toggleUI == 'assessments' ? <>

                    <div className="card-body">
                        <div className="row">

                            <div className="col-4 d-flex flex-row">
                                <GrAnalytics className="mr-2" size={30} />
                                <Link to={routes.TrialPeriodAssessmentIndex + '?employee_id=' + id}>
                                    تقييمات فترة التجريب للموظف {employee?.trial_period_assessments.length}
                                </Link>
                            </div>
                            <div className="col-4 d-flex flex-row">
                                <IoMdAnalytics className="mr-2" size={30} />
                                <Link to={routes.TrainingPeriodAssessmentIndex + '?employee_id=' + id}>
                                    تقييمات فترة التدريب للموظف {employee?.training_period_assessments.length}
                                </Link>
                            </div>
                            <div className="col-4 d-flex flex-row">
                                <GrAnalytics className="mr-2" size={30} />
                                <Link to={routes.interviewAssessmentIndex + '?name=' + employee?.name}>
                                    تقييمات المقابلة التي تخص الموظف
                                </Link>
                            </div>
                            <div className="col-4 d-flex flex-row">
                                <GrAnalytics className="mr-2" size={30} />
                                <Link to={routes.TraineeCourseAssessmentIndex + '?employee_id=' + id}>
                                    تقييمات الموظف للدورات التي مر بها {traineeCourseAssessments.length}
                                </Link>
                            </div>
                        </div>

                    </div> </> : null
            }
            {
                toggleUI == 'notes' ?

                    <div className="card">
                        <div className="card-header ">
                            <div className="row justify-content-between">
                                <strong>ملاحظات حول ملف الموظف</strong>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="col-12" >
                                <Comments commentable_id={id} type={'employee'} />
                            </div>
                        </div>
                    </div> : null
            }
        </div >
    )
}