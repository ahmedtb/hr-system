import React from 'react'
import axios from 'axios'
import ApiEndpoints from './utility/ApiEndpoints'
import logError from './utility/logError'
import FormsTable from './partials/FormsTable'
import UnitsList from './partials/UnitsList'
import CoursesTable from './partials/CoursesTable'
import TopMenue from './partials/TopMenue'
export default function Dashboard() {

    const [employeesCount, setemployeesCount] = React.useState(null)
    const [targetedCount, settargetedCount] = React.useState(null)
    const [coachesCount, setcoachesCount] = React.useState(null)
    const [programsCount, setprogramsCount] = React.useState(null)
    const [resumedCourses, setresumedCourses] = React.useState([])
    const [plannedCoursesCount, setplannedCoursesCount] = React.useState(null)
    const [doneCoursesCount, setdoneCoursesCount] = React.useState(null)
    const [canceledCoursesCount, setcanceledCoursesCount] = React.useState(null)

    const [units, setunits] = React.useState([])
    const [forms, setforms] = React.useState([])

    React.useEffect(() => {
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
            setresumedCourses(response.data.resumedCourses)
        }).catch((error) => logError(error))
    }, [])

    return (
        <div className="row justify-content-center">

            <div className='col-md-12'>
                <div className="card">
                    <div className="card-header">
                        احصائية عامة
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد الموظفين في المنظومة {employeesCount}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد المستهدفين في المنظومة {targetedCount}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد المدربين في المنظومة {coachesCount}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد الحقائب التدريبية في المنظومة {programsCount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد الدورات التدريبية المخطط لها {plannedCoursesCount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد الحقائب التدريبية المنتهية {doneCoursesCount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        عدد الحقائب التدريبية الملغية {canceledCoursesCount}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="card mt-1">
                            {
                                (forms.length) ? (
                                    <>
                                        <div className="card-header">
                                            <h5>نماذج تم تعبئتها مؤخرا</h5>
                                        </div>
                                        <div className="card-body">
                                            <FormsTable forms={forms} />

                                        </div>
                                    </>
                                ) : null
                            }

                        </div>



                        <div className="card mt-1">

                            <div className="card-header">
                                <h5 className=''>الدورات الجارية: {resumedCourses.length}</h5>
                            </div>
                            <div className=" card-body">
                                <CoursesTable courses={resumedCourses} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        التركيبة الادارية
                    </div>
                    <div className="card-body">
                        <UnitsList units={units} />
                    </div>
                </div>


            </div>
        </div>
    )
}