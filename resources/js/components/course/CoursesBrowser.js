import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import CoursesTable from '../partials/CoursesTable';
import ScheduleDiagram from './components/ScheduleDiagram'
import moment from 'moment'
import Pagination from '../utility/Pagination';

export default function CoursesBrowser(props) {
    const [courses, setcourses] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [start_date, setstart_date] = React.useState(null)
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.courseIndex, params = null) {
        axios.get(link, { params: params }).then((response) => {
            setcourses(response.data.data)
            setparams(params)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        }).catch((error) => logError(error))
    }
    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));

        fetchPage(ApiEndpoints.courseIndex, params)
    }, [])
    return (
        <div className="col-md-12">



            <>
                <div className="card">
                    <div className="card-header">قائمة الدورات</div>
                    <div className="card-body ">
                        <div className="row align-items-start">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                ترشيح الدورات وفقا لـ
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">ترشيح الدورات وفقا لــ</h5>
                                        </div>
                                        <div className="modal-body row">

                                            <button type="button" className={(params?.resumed == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.courseIndex, { resumed: 'true' })}>الدورات المستانفة</button>
                                            <button type="button" className={(params?.planned == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.courseIndex, { planned: 'true' })}>الدورات المخطط لها</button>
                                            <button type="button" className={(params?.done == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.courseIndex, { done: 'true' })}>الدورات المنتهية</button><br />
                                            <button type="button" className={(params?.canceled == 'true') ? "btn btn-success mx-2 my-1" : "btn btn-info mx-2 my-1"} onClick={() => fetchPage(ApiEndpoints.courseIndex, { canceled: 'true' })}>الدورات الملغية</button><br />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded p-1 mx-2">
                                <div className="d-flex flex-row my-2 align-items-center">
                                    <label>تاريخ بدء</label><br />
                                    <input className="form-control ml-1" type="date" onChange={(e) => setstart_date(e.target.value)} /><br />
                                    <button className="form-control btn btn-info ml-1" onClick={() => {
                                        let params = Object.assign({},
                                            start_date === null ? null : { start_date },
                                        )
                                        fetchPage(ApiEndpoints.courseIndex, params)
                                    }}>فلترة</button>
                                </div>

                            </div>

                        </div>

                        <Pagination
                            fetchPage={fetchPage}
                            links={links}
                        />
                        <CoursesTable courses={courses} />
                    </div>
                </div>
            </>
        </div >
    );
}

