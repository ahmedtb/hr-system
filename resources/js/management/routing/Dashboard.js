import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import FormsTable from '../components/FormsTable'
import UnitsList from '../components/UnitsList'
import CoursesTable from '../components/CoursesTable'
import TopMenue from '../components/TopMenue'
import Pagination from '../components/Pagination'
import AllowedLink from '../components/AllowedLink'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import routes from '../utility/routesEndpoints'
import { FaUserTie, FaUserCheck, FaChalkboardTeacher, FaSuitcase, FaGraduationCap } from 'react-icons/fa'
import moment from 'moment'
function DateSchedule(props) {
    const resumedCourses = props.resumedCourses

    return (
        <table className="table table-bordered table-condensed table-responsive">
            <thead>
                <tr>
                    <th >عنوان الدورة</th>
                    <th>زمن بدء المحاضرة</th>
                    <th>زمن الانتهاء المحاضرة</th>
                </tr>
            </thead>
            <tbody>
                {resumedCourses?.map((course, index) => (

                    course.scheduleTable[moment().format('Y-MM-DD')] ? (
                        <tr key={index}>
                            <td>
                                <AllowedLink to={routes.showCourse.replace(':id', course.id)}>{course.title}</AllowedLink >

                            </td>
                            <td>
                                {course.scheduleTable[moment().format('Y-MM-DD')][0]}
                            </td>
                            <td>
                                {course.scheduleTable[moment().format('Y-MM-DD')][1]}
                            </td>
                        </tr>
                    ) : null

                ))}
            </tbody>
        </table>
    )
}

function Dashboard(props) {

    const [employeesCount, setemployeesCount] = React.useState(null)
    const [targetedCount, settargetedCount] = React.useState(null)
    const [coachesCount, setcoachesCount] = React.useState(null)
    const [programsCount, setprogramsCount] = React.useState(null)
    const [plannedCoursesCount, setplannedCoursesCount] = React.useState(null)
    const [doneCoursesCount, setdoneCoursesCount] = React.useState(null)
    const [canceledCoursesCount, setcanceledCoursesCount] = React.useState(null)

    const [units, setunits] = React.useState([])
    const [forms, setforms] = React.useState([])
    const [attendancesCount, setattendancesCount] = React.useState([])

    async function getDashboard() {
        axios.get(ApiEndpoints.dashboard).then((response) => {
            setemployeesCount(response.data.employeesCount)
            settargetedCount(response.data.targetedCount)
            setcoachesCount(response.data.coachesCount)
            setprogramsCount(response.data.programsCount)
            setplannedCoursesCount(response.data.plannedCoursesCount)
            setdoneCoursesCount(response.data.doneCoursesCount)
            setcanceledCoursesCount(response.data.canceledCoursesCount)

            setunits(response.data.units)
            setforms(response.data.forms)
            setattendancesCount(response.data.attendancesCount)
            console.log('dashboard units', response.data.units)
        }).catch((error) => logError(error))
    }

    const [resumedCourses, setresumedCourses] = React.useState([])
    const [resumedCoursesTotal, setresumedCoursesTotal] = React.useState([])
    const [links, setlinks] = React.useState([])
    async function getCourses(link = ApiEndpoints.courseIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, resumed: true, page_size: 5 } })
            // console.log('dashboard resumedCourses', response.data.data)
            setresumedCourses(response.data.data)
            setresumedCoursesTotal(response.data.total)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        } catch (error) {
            logError(error)
        }

    }

    React.useEffect(() => {
        if(props.user){
            getDashboard()
            getCourses()
        }else{
            setredirect(routes.loginPage)
        }
    }, [props.user])
    
    const [redirect, setredirect] = React.useState(null);
    if(redirect){
        return <Redirect to={redirect}/>
    }


    return (
        <div className="row justify-content-center">



            <div className='col-md-12'>


                <div className="">


                    <div className="row">
                        {
                            (forms.length) ? (
                                <div className="col-3">
                                    <h3 className="text-center">نماذج تم تعبئتها مؤخرا</h3>
                                    <FormsTable forms={forms} />

                                </div>
                            ) : null
                        }
                        <div className="col-4">
                            <h3 className="text-center">الحضور اليومي للدورات</h3>
                            <LineChart width={500} height={300} data={attendancesCount}>
                                <Line type="monotone" dataKey="attendances_count" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>
                        <div className="col-5">

                            <h3 className='text-center'>جدول المحاضرات اليوم</h3>
                            <DateSchedule resumedCourses={resumedCourses} />
                        </div>

                    </div>

                    <h3 className='text-center'>الدورات الجارية: {resumedCoursesTotal}</h3>
                    <Pagination
                        fetchPage={getCourses}
                        links={links}
                    />
                    <CoursesTable courses={resumedCourses} />


                </div>
                <div className="card">
                    <h3 className="card-header">
                        تركيبة المنظومة
                    </h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-9">

                                <UnitsList units={units} />
                            </div>

                            <div className="col-3">

                                <div className="border rounded p-2">
                                    <FaUserTie />
                                    عدد الموظفين في المنظومة {employeesCount}
                                </div>

                                <div className="border rounded p-2">
                                    <FaUserCheck />
                                    عدد المستهدفين في المنظومة {targetedCount}
                                </div>

                                <div className="border rounded p-2">
                                    <FaChalkboardTeacher />
                                    عدد المدربين في المنظومة {coachesCount}
                                </div>

                                <div className="border rounded p-2">
                                    <FaSuitcase />
                                    عدد الحقائب التدريبية في المنظومة {programsCount}
                                </div>

                                <div className="border rounded p-2">
                                    <FaGraduationCap />
                                    عدد الدورات التدريبية المخطط لها {plannedCoursesCount}
                                </div>

                                <div className="border rounded p-2">
                                    <FaGraduationCap />
                                    عدد الدورات التدريبية المنتهية {doneCoursesCount}
                                </div>

                                <div className="border rounded p-2">
                                    <FaGraduationCap />
                                    عدد الدورات التدريبية الملغية {canceledCoursesCount}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div >
    )
}

import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"
import { Redirect } from 'react-router'

const mapStateToProps = state => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
        // loginUser: (name,password) => dispatch(loginUser(name,password)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
