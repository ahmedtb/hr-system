import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';
import EmployeesTable from '../partials/EmployeesTable'
import TargetedIndividualsTable from '../partials/TargetedIndividualsTable'
import SchedualTable from './components/SchedualTable'
import EnrollmentModal from './components/EnrollmentModal'
import AllowedLink from '../components/AllowedLink'
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
            console.log('course show', response.data)

            setattendances(response.data.attendances)
        } catch (err) {
            logError(err)
        }
    }

    React.useEffect(() => {
        getCourseAndAttendances()
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    الدورة رقم {course?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            عنوان الدورة: {course?.title}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            <div className="row">
                                تاريخ بدء الدورة: {course?.start_date}
                            </div>
                            <div className="row">
                                تاريخ انتهاء الدورة: {course?.end_date}
                            </div>
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            حالة الدورة: {course?.state}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            اسم البرنامج التدريبي للدورة: <AllowedLink to={routes.showProgram.replace(':id', program?.id)}>{program?.title}</AllowedLink>
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            الايام التي مضت في الدورة {course?.wentDays?.length}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            الايام المتبقية {course?.remainingDays?.length}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            نسبة الحضورة {course?.attendancePercentage} %
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            عدد المسجلين {employees?.length + individuals?.length}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            عدد الموظفيين المسجلين {employees?.length}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            عدد الافراد المستهدفين المسجلين في الدورة {individuals?.length}
                        </div>
                    </div>
                </div>

            </div>

            <div className="card my-2">
                <div className="card-header">
                    اجراءات
                </div>

                <div className="card-body">
                    <AllowedLink
                        hide={true}
                        to={{
                            pathname: routes.showAttendances.replace(':course_id', course?.id),
                            // state: {attendances: attendances}
                        }}
                    >سجلات الحضور</AllowedLink>
                </div>
            </div>


            <div className="card">
                <div className="card-header">
                    جدول الدورة
                </div>

                <div className="card-body">
                    <SchedualTable schedualTable={course?.schedualTable} attendances={attendances} />
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    المسجلين بالدورة
                </div>

                <div className="card-body">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#EnrollmentModal">
                        تسجيل موظف او مستهدف في الدورة
                    </button>
                    <EnrollmentModal onChange={getCourseAndAttendances} course={course} />
                    <ul className="list-group" >
                        <li className="list-group-item" >
                            موظفيين
                            <EmployeesTable employees={employees} />
                        </li>
                        <li className="list-group-item" >
                            مستهدفيين
                            <TargetedIndividualsTable individuals={individuals} />
                        </li>

                    </ul>
                </div>

            </div>


        </div>
    )
}