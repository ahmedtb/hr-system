import React from 'react'
import axios from 'axios'
import { Link, useParams, useLocation } from 'react-router-dom'
import ApiEndpoints from '../../utility/ApiEndpoints'
import routes from '../../utility/routesEndpoints'
import logError from '../../utility/logError'
import Pagination from '../../components/Pagination'
import TrialPeriodAssessmentTable from './components/TrialPeriodAssessmentsTable'

function Filters(props) {
    const fetchPage = props.fetchPage
    const params = props.params
    const [from, setfrom] = React.useState(null)
    const [to, setto] = React.useState(null)

    const [trial_begin, settrial_begin] = React.useState(null)
    const [trial_end, settrial_end] = React.useState(null)

    const [employees, setemployees] = React.useState(null)
    const [employee_id, setemployee_id] = React.useState(null)

    async function getEmployees() {
        axios.get(ApiEndpoints.getEmployees).then((response) => {
            setemployees(response.data)
        }).catch((err) => logError(err))
    }

    React.useEffect(() => {
        getEmployees()
    },[])
    return (
        <>
            <div className="col-3">
                <div className="card">
                    <h4 className="card-header">ترشيح البيانات</h4>
                    <div className="card-body">

                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            ترتيب التقيمات وفقا لــ
                        </button>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">ترتيب التقييمات</h5>
                                    </div>
                                    <div className="modal-body row">
                                        <button type="button" className={(params?.orderByDesc == 'final_degree') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'final_degree' })}>افضل درجة كلية</button>
                                        <button type="button" className={(params?.orderByDesc == 'excitement') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'excitement' })}>الافضل في سمة الحماسة</button>
                                        <button type="button" className={(params?.orderByDesc == 'ability_to_improve') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'ability_to_improve' })}>الافضل في القدرة على التعلم والتطور</button>
                                        <button type="button" className={(params?.orderByDesc == 'guidance_acceptance') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'guidance_acceptance' })}>الافضل في تقبل واستيعاب التوجيه</button>
                                        <button type="button" className={(params?.orderByDesc == 'handling_technology') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'handling_technology' })}>الافضل في التعامل مع التقنية</button>

                                        <button type="button" className={(params?.orderByDesc == 'maintaining_working_hours') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'maintaining_working_hours' })}>الافضل في المحافظة على الوقت أثناء الدوام</button>
                                        <button type="button" className={(params?.orderByDesc == 'relationship_with_colleagues') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'relationship_with_colleagues' })}>الافضل في العلاقة مع الزملاء</button>
                                        <button type="button" className={(params?.orderByDesc == 'behavior') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'behavior' })}>الافضل في حسن التصرف</button>

                                        <button type="button" className={(params?.orderByDesc == 'look') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'look' })}>الافضل في حسن المظهر</button>
                                        <button type="button" className={(params?.orderByDesc == 'belief_and_loyalty') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'belief_and_loyalty' })}>الافضل في الإيمان بسياسة القناة والولاء لها</button>

                                        <button type="button" className={(params?.orderByDesc == 'delay_in_min') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByAsc: 'delay_in_min' })}>الافضل من حيث التأخير بالدقائق</button>
                                        <button type="button" className={(params?.orderByDesc == 'early_departure_min') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByAsc: 'early_departure_min' })}>الافضل من حيث الخروج المبكر بالدقائق</button>
                                        <button type="button" className={(params?.orderByDesc == 'absence_days') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByAsc: 'absence_days' })}>الافضل من حيث الغياب</button>
                                        <button type="button" className={(params?.orderByDesc == 'attendance_rate') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.getTrialPeriods, { ...params, orderByDesc: 'attendance_rate' })}>الافضل من حيث نسبة الحضور</button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded my-2">
                            <div className="p-2">
                                <strong>تريشح حسب الموظف</strong>
                                <select className="form-control" onChange={(e) => setemployee_id(e.target.value)} name="employee_id">
                                    <option value=''>اختر الموظف</option>
                                    {
                                        employees?.map((employee, index) => (
                                            <option key={index} value={employee.id}>{employee.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button className="btn btn-success" onClick={() => {
                                let params = Object.assign({},
                                    employee_id === null ? null : { employee_id },
                                )
                                fetchPage(ApiEndpoints.getTrialPeriods, params)
                            }}>ترشيح</button>

                        </div>

                        <div className="border rounded my-2">
                            <strong>تاريخ اعداد التقرير بين:</strong>
                            <div className="">
                                <label className="form-check" >بدء</label>
                                <input className="form-check" type="date" onChange={(e) => setfrom(e.target.value)} />
                            </div>
                            <div className="">
                                <label className="form-check" >نهاية</label>
                                <input className="form-check" type="date" onChange={(e) => setto(e.target.value)} />
                            </div>

                            <button className="btn btn-success" onClick={() => {
                                let params = Object.assign({},
                                    from === null ? null : { from },
                                    to === null ? null : { to },
                                )
                                fetchPage(ApiEndpoints.getTrialPeriods, params)
                            }}>ترشيح</button>

                        </div>

                        <div className="border rounded my-2">
                            <strong>تاريخ بدء ونهاية الفترة:</strong>
                            <label className="form-check" >بداية</label>
                            <input className="form-check" type="date" onChange={(e) => settrial_begin(e.target.value)} />
                            <label className="form-check" >نهاية</label>
                            <input className="form-check" type="date" onChange={(e) => settrial_end(e.target.value)} />


                            <button className="btn btn-success" onClick={() => {
                                let params = Object.assign({},
                                    trial_begin === null ? null : { trial_begin },
                                    trial_end === null ? null : { trial_end },
                                )
                                // console.log(params)
                                fetchPage(ApiEndpoints.getTrialPeriods, params)
                            }}>ترشيح</button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default function TrialPeriodAssessmentIndex() {

    const [assessments, setassessments] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.getTrialPeriods, params = null) {
        axios.get(link, { params: params }).then((response) => {
            setassessments(response.data.data)
            setparams(params)
            console.log(response.data)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        }).catch((error) => logError(error))
    }



    React.useEffect(() => {
        // getEmployees()
        var params = Object.fromEntries(new URLSearchParams(location.search));
        console.log(location.search)
        fetchPage(ApiEndpoints.getTrialPeriods, params)

    }, [])

    return (
        <div className="col-12">


            <div className="row">

                <Filters fetchPage={fetchPage} params={params} />

                <div className="col-9">
                    <div className="card">

                        <div className="card-header d-flex justify-content-between">
                            <h4>تقييمات فترة التجريب</h4>
                            <Link to={routes.conductTrialPeriodAssessment}>اجراء تقييم الموظف في الفترة التجريبية</Link>
                        </div>
                        <div className="card-body">
                            <div className="">
                                <TrialPeriodAssessmentTable trialPeriods={assessments} />
                                <Pagination
                                    fetchPage={fetchPage}
                                    links={links}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}