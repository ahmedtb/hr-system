import React from 'react'
import axios from 'axios'
import ApiEndpoints from './utility/ApiEndpoints'
import ActionsPanel from './partials/ActionsPanel'
import FormsTable from './partials/FormsTable'
import UnitsList from './partials/UnitsList'
export default function Dashboard() {

    const [employeesCount, setemployeesCount] = React.useState(null)
    const [targetedCount, settargetedCount] = React.useState(null)
    const [coachesCount, setcoachesCount] = React.useState(null)
    const [programsCount, setprogramsCount] = React.useState(null)
    const [units, setunits] = React.useState([])
    const [forms, setforms] = React.useState([])
    const [resumedCourses, setresumedCourses] = React.useState([])

    React.useEffect(() => {
        axios.get(ApiEndpoints.dashboard).then((response) => {
            setemployeesCount(response.data.employeesCount)
            settargetedCount(response.data.targetedCount)
            setcoachesCount(response.data.coachesCount)
            setprogramsCount(response.data.programsCount)
            setunits(response.data.units)
            setforms(response.data.forms)
            setresumedCourses(response.data.resumedCourses)
        }).catch(() => {

        })
    }, [])

    return (
        <div className="row justify-content-center">
            <div className="col-md-3">
                <ActionsPanel />
            </div>
            <div className='col-md-9'>
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
                        </div>

                        <div className="card mt-1">
                            <div className="card-header">
                                <h5>اخر نماذج تم تعبئتها</h5>
                            </div>
                            <div className="card-body">
                                <FormsTable forms={forms} />

                            </div>
                        </div>



                        <div className="card mt-1">

                            <div className="card-header">
                                <h5 className=''>الدورات الجارية: {resumedCourses.length}</h5>
                            </div>
                            <div className=" card-body">
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