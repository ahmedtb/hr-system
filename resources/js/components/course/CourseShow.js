import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';
import EmployeesTable from '../partials/EmployeesTable'
import TargetedIndividualsTable from '../partials/TargetedIndividualsTable'
import SchedualTable from './SchedualTable'
export default function CourseShow(props) {

    const { id } = useParams();
    const [course, setcourse] = React.useState(null)

    React.useEffect(() => {
        axios.get(ApiEndpoints.getCourse?.replace(':id', id)).then((response) => {
            setcourse(response.data.course)
            console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
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
                            اسم البرنامج التدريبي للدورة: <Link to={routes.showProgram.replace(':id', course?.training_program.id)}>{course?.training_program.title}</Link>
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
                            عدد المسجلين {course?.employees.length + course?.targeted_individuals.length}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            عدد الموظفيين المسجلين {course?.employees.length}
                        </div>
                        <div className="col-5 border  border-dark rounded m-2 text-center">
                            عدد المستهدفين في المسجلين في الدورة {course?.targeted_individuals.length}
                        </div>
                    </div>
                </div>

            </div>

            <div className="card">
                <div className="card-header">
                    اجراءات
                </div>

                <div className="card-body">
                   تسجيلات الحضور
                </div>
            </div>


            <div className="card">
                <div className="card-header">
                    جدول الدورة
                </div>

                <div className="card-body">
                    <SchedualTable schedualTable={course?.schedualTable} />
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    المسجلين بالدورة
                </div>

                <div className="card-body">
                    <ul className="list-group" >
                        <li className="list-group-item" >
                            موظفيين
                            <EmployeesTable employees={course?.employees} />
                        </li>
                        <li className="list-group-item" >
                            مستهدفيين
                            <TargetedIndividualsTable individuals={course?.targeted_individuals} />
                        </li>

                    </ul>
                </div>

            </div>


        </div>
    )
}