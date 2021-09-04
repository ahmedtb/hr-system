import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Redirect } from 'react-router-dom';
import EmployeesTable from '../partials/EmployeesTable'
import TargetedIndividualsTable from '../partials/TargetedIndividualsTable'
import ScheduleTable from './components/ScheduleTable'
import EnrollmentModal from './components/EnrollmentModal'
import AllowedLink from '../components/AllowedLink'
import {
    FaSpinner,
    FaSplotch,
    FaCalculator,
    FaPercentage,
    FaUsers,
    FaAccusoft,
    FaBook,
    FaSignature,
    FaRegCalendarCheck,
    FaTrafficLight,
    FaShoppingBag,

} from 'react-icons/fa';
import Comments from '../components/Comments'
import RenderDocuments from '../components/RenderDocuments'
import CustomModal from '../components/CustomModal'
import EditCourseModal from './components/EditCourseModal'
export default function CourseShow(props) {

    const { id } = useParams();
    const [course, setcourse] = React.useState(null)
    const [program, setprogram] = React.useState(null)
    const [employees, setemployees] = React.useState(null)
    const [individuals, setindividuals] = React.useState(null)
    const [attendances, setattendances] = React.useState(null)

    async function getCourseAndAttendances() {
        try {
            const response = await axios.get(ApiEndpoints.getCourse?.replace(':id', id))
            setcourse(response.data.course)
            setprogram(response.data.program)
            setemployees(response.data.employees)
            setindividuals(response.data.individuals)
            // console.log('course show', response.data)

            setattendances(response.data.attendances)
        } catch (err) {
            logError(err)
        }
    }

    React.useEffect(() => {
        getCourseAndAttendances()
    }, [])

    async function deleteCourse() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteCourse.replace(':id', course.id))
            console.log('courseShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.dashboard} />;
    }
    const [toggleUI, settoggleUI] = React.useState('documents')

    return (
        <div className="col-md-12 pb-5">


            <div className="row wrap">
                <div className="col-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex flex-row justifiy-content-between">
                                <h4>
                                    الدورة رقم {course?.id}
                                </h4>
                            </div>
                        </div>

                        <div className="card-body p-1">
                            <div className="justify-content-center">
                                <div className="col border border-ligth border-left-0 border-right-0 rounded my-1 p-2">
                                    <div className="d-flex flex-row justify-content-center mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaSignature className="mr-2" />
                                        <strong className="">عنوان الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.title}</p>

                                    <div className="d-flex flex-row justify-content-center mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaRegCalendarCheck className="mr-2" />
                                        <strong className="">تاريخ بدء الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.start_date}</p>

                                    <div className="d-flex flex-row justify-content-center mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaRegCalendarCheck className="mr-2" />
                                        <strong className="">تاريخ انتهاء الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.end_date}</p>


                                    <div className="d-flex flex-row justify-content-center mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaShoppingBag className="mr-2" />
                                        <strong className="">البرنامج التدريبي</strong>
                                    </div>
                                    <p className="text-center"><AllowedLink to={routes.showProgram.replace(':id', program?.id)}>{program?.title}</AllowedLink></p>

                                    <div className="d-flex flex-row justify-content-center mb-2 border border-top-0 border-left-0 border-right-0 border-info">

                                        <FaSpinner className="mr-2" />
                                        <strong className="">الايام التي مضت في الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.wentDays?.length}</p>


                                    <div className="d-flex flex-row justify-content-center mb-2">
                                        <FaTrafficLight className="mr-2" />
                                        <strong className="mr-2">حالة الدورة</strong>
                                        <p>{course?.state}</p>
                                    </div>

                                    <div className="d-flex flex-row justify-content-center mb-2">
                                        <FaSplotch className="mr-2" />
                                        <strong className="mr-2">الايام المتبقية</strong>
                                        <p className="">{course?.remainingDays?.length}</p>
                                    </div>

                                    <div className="d-flex flex-row justify-content-center mb-2">
                                        <FaPercentage className="mr-2" />
                                        <strong className="mr-2">نسبة الحضور</strong>
                                        <p className="">{course?.attendancePercentage}</p>
                                    </div>

                                    {
                                        employees?.length >= 0 && individuals?.length >= 0 ?
                                            <div className="d-flex flex-row justify-content-center mb-2">
                                                <FaCalculator className="mr-2" />

                                                <strong className="mr-2">عدد المسجلين</strong>
                                                <p className="">{employees?.length + individuals?.length}</p>
                                            </div> : null
                                    }
                                    {
                                        employees?.length >= 0 ?
                                            <div className="d-flex flex-row justify-content-center mb-2">
                                                <FaAccusoft className="mr-2" />

                                                <strong className="mr-2">عدد الموظفيين المسجلين</strong>
                                                <p className="">{employees?.length}</p>
                                            </div> : null
                                    }
                                    {
                                        individuals?.length >= 0 ?
                                            <div className="d-flex flex-row justify-content-center mb-2">
                                                <FaUsers className="mr-2" />

                                                <strong className="mr-2">عدد المستهدفين المسجلين</strong>
                                                <p className="">{individuals?.length}</p>
                                            </div> : null
                                    }
                                    <CustomModal buttonClass="btn btn-info" label={'حدف الدورة من السجلات'} >
                                        <div>
                                            هل تود فعلا حدف الدورة من السجل بشكل دائما؟
                                        </div>
                                        <button className="btn btn-secondary" onClick={deleteCourse} data-dismiss="modal">نعم</button>
                                        <button className='btn btn-success' data-dismiss="modal">لا</button>

                                    </CustomModal>
                                    <EditCourseModal course={course} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-9">

                    <div className="card">
                        <div className="card-header ">
                            <div className="row justify-content-between">
                                <strong>جدول الدورة</strong>

                                <AllowedLink
                                    hide={true}
                                    to={routes.showAttendances.replace(':id', course?.id)}
                                ><FaBook /> سجلات الحضور</AllowedLink>

                            </div>
                        </div>

                        <div className="card-body row">
                            <div style={{ maxHeight: 500, overflow: 'auto', display: 'inline-block' }}>
                                <ScheduleTable scheduleTable={course?.scheduleTable} attendances={attendances} />
                            </div>


                        </div>
                    </div>

                    {employees && individuals ?
                        < div className="card">
                            <div className="card-header">
                                <div className="row justify-content-between">
                                    <strong>المسجلين بالدورة</strong>
                                    <a className="text-primary" data-toggle="modal" data-target="#EnrollmentModal">
                                        تسجيل موظف او مستهدف في الدورة
                                    </a>
                                    <EnrollmentModal onChange={getCourseAndAttendances} course={course} />
                                </div>
                            </div>

                            <div className="card-body">

                                <div className="" >
                                    <div className="" >
                                        <h5 className="text-center">موظفيين</h5>
                                        <EmployeesTable employees={employees} />
                                    </div>
                                    <div className="" >
                                        <h5 className="text-center">مستهدفيين</h5>
                                        <TargetedIndividualsTable individuals={individuals} />
                                    </div>

                                </div>
                            </div>

                        </div> : null
                    }
                </div>

                <div className="row justify-content-around">
                    <div onClick={() => settoggleUI('documents')} className={"p-2 rounded " + (toggleUI == 'documents' ? 'bg-primary' : 'bg-light') }>المستندات</div>
                    <div onClick={() => settoggleUI('notes')} className={"p-2 rounded " + (toggleUI == 'notes' ? 'bg-primary' : 'bg-light') }>ملاحظات</div>
                </div>
                {
                    toggleUI == 'documents' ?
                        <div className="col-12">

                            <div className="card">

                                <div className="card-body">
                                    <div className="row justify-content-between">
                                        <h4>المستندات الملحق بالدورة</h4>
                                        <AllowedLink to={{
                                            pathname: routes.attachDocument, state: { documentable: course, type: 'App\\Models\\TrainingCourse' }
                                        }}>الحاق مستند جديد</AllowedLink>
                                    </div>
                                    <div className="row bg-light">

                                        <RenderDocuments
                                            documentable_id={id}
                                            documentable_type='App\Models\TrainingCourse'
                                        />

                                    </div>

                                </div >
                            </div >

                        </div> : null
                }
                {
                    toggleUI == 'notes' ?
                        <div className="col-12">
                            <h4>ملاحظات حول الدورة</h4>
                            <div className="col-12" style={{ maxHeight: 500, overflow: 'auto', display: 'inline-block' }}>
                                <Comments commentable_id={id} type={'course'} />
                            </div>
                        </div> : null
                }
            </div>

        </div >
    )
}