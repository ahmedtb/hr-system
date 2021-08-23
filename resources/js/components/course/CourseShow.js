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
import { FaSpinner, FaSplotch, FaCalculator, FaPercentage, FaUsers, FaAccusoft, FaBook } from 'react-icons/fa';

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

            <div className="row wrap">
                <div className="col-3">
                    <div className="card">
                        <div className="card-header">
                            الدورة رقم {course?.id}
                        </div>

                        <div className="card-body p-1">
                            <div className="justify-content-center">
                                <div className="col border border-ligth border-left-0 border-right-0 rounded my-1 p-2">
                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <svg className="bi bi-bookmark-plus mx-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
                                        </svg>
                                        <strong className="">عنوان الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.title}</p>

                                </div>
                                <div className="col border border-ligth border-left-0 border-right-0 rounded my-1 p-2">
                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check mx-2" viewBox="0 0 16 16">
                                            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                        <strong className="">تاريخ بدء الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.start_date}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-x mx-2" viewBox="0 0 16 16">
                                            <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                        <strong className="">تاريخ انتهاء الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.end_date}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-diamond" viewBox="0 0 16 16">
                                            <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                        </svg>
                                        <strong className="">حالة الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.state}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-fill mx-2" viewBox="0 0 16 16">
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                                        </svg>
                                        <strong className="">اسم البرنامج التدريبي للدورة</strong>
                                    </div>
                                    <p className="text-center"><AllowedLink to={routes.showProgram.replace(':id', program?.id)}>{program?.title}</AllowedLink></p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">

                                        <FaSpinner />
                                        <strong className="">الايام التي مضت في الدورة</strong>
                                    </div>
                                    <p className="text-center">{course?.wentDays?.length}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaSplotch />
                                        <strong className="">الايام المتبقية</strong>
                                    </div>
                                    <p className="text-center">{course?.remainingDays?.length}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaPercentage />
                                        <strong className="">نسبة الحضور</strong>
                                    </div>
                                    <p className="text-center">{course?.attendancePercentage}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaCalculator />

                                        <strong className="">عدد المسجلين</strong>
                                    </div>
                                    <p className="text-center">{employees?.length + individuals?.length}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaAccusoft />

                                        <strong className="">عدد الموظفيين المسجلين</strong>
                                    </div>
                                    <p className="text-center">{employees?.length}</p>

                                    <div className="d-flex flex-row justify-content-evenly mb-2 border border-top-0 border-left-0 border-right-0 border-info">
                                        <FaUsers />

                                        <strong className="">عدد المستهدفين المسجلين</strong>
                                    </div>
                                    <p className="text-center">{individuals?.length}</p>
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

                        <div className="card-body">
                            <SchedualTable schedualTable={course?.schedualTable} attendances={attendances} />
                        </div>
                    </div>
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