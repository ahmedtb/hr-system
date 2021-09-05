import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useParams, Redirect } from 'react-router-dom';
import Pagination from '../utility/Pagination';
import CoursesTable from '../partials/CoursesTable';
import routes from '../utility/routesEndpoints';
import RenderDocuments from '../components/RenderDocuments'
import AllowedLink from '../components/AllowedLink';
import Comments from '../components/Comments';
import CustomModal from '../components/CustomModal';
import EditProgram from './components/EditProgramModal';
export default function ProgramShow(props) {

    const { id } = useParams();
    const [program, setprogram] = React.useState(null)

    async function getProgram() {
        axios.get(ApiEndpoints.getProgram.replace(':id', id)).then((response) => {
            setprogram(response.data)
        }).catch((err) => {
            logError(err)
        })
    }


    const [courses, setcourses] = React.useState([])
    const [links, setlinks] = React.useState([])

    async function fetchCourses(link = ApiEndpoints.courseIndex, params = { training_program_id: id }) {
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setcourses(response.data.data)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        getProgram();
        fetchCourses();
    }, [])

    async function deleteProgram() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteProgram.replace(':id', program.id))
            console.log('programShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.dashboard} />;
    }
    const [toggleUI, settoggleUI] = React.useState('documents')

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row justify-content-between">

                        البرنامج رقم {program?.id}
                        <div>
                            <CustomModal buttonClass="btn btn-info mr-2" label={'حدف البرنامج من السجلات'} >
                                <div>
                                    هل تود فعلا حدف البرنامج من السجل بشكل دائما؟
                                </div>
                                <button className="btn btn-secondary" onClick={deleteProgram} data-dismiss="modal">نعم</button>
                                <button className='btn btn-success' data-dismiss="modal">لا</button>

                            </CustomModal>
                            <EditProgram program={program} />
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">

                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تصنيف البرنامج {program?.category}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تفاصيل البرنامج {program?.details}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            اهداف البرنامج {program?.goals}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            مدة البرنامج زمنياً {program?.period} دقيقة
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            عنوان البرنامج {program?.title}
                        </div>

                    </div>
                </div>

            </div>


            <div className="row justify-content-around">
                <div onClick={() => settoggleUI('documents')} className={"p-2 rounded " + (toggleUI == 'documents' ? 'bg-primary' : 'bg-light')}>المستندات</div>
                <div onClick={() => settoggleUI('courses')} className={"p-2 rounded " + (toggleUI == 'courses' ? 'bg-primary' : 'bg-light')}>دورات</div>
                <div onClick={() => settoggleUI('notes')} className={"p-2 rounded " + (toggleUI == 'notes' ? 'bg-primary' : 'bg-light')}>ملاحظات</div>
            </div>

            {
                toggleUI == 'documents' ? <div className="card">
                    <div className="card-header row">
                        <div>المستندات الملحق بالبرنامج</div>
                        <AllowedLink to={{
                            pathname: routes.attachDocument, state: { documentable: program, type: 'App\\Models\\TrainingProgram' }
                        }}>الحاق مستند جديد</AllowedLink>
                    </div>

                    <div className="card-body">
                        <div className="row">

                            <RenderDocuments
                                documentable_id={id}
                                documentable_type='App\Models\TrainingProgram'
                            />

                        </div>

                    </div>
                </div > : null
            }

            {
                toggleUI == 'courses' ? <div className="card">
                    <div className="card-header">
                        الدورات التي تتبع البرنامج
                    </div>

                    <div className="card-body">
                        <Pagination
                            fetchPage={fetchCourses}
                            links={links}
                        />
                        <CoursesTable courses={courses} />
                    </div>
                </div> : null
            }


            {
                toggleUI == 'notes' ?
                    <div className="card">
                        <div className="card-header ">
                            <div className="row justify-content-between">
                                <strong>تعليقات حول البرنامج</strong>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="col-12" style={{ maxHeight: 500, overflow: 'auto', display: 'inline-block' }}>
                                <Comments commentable_id={id} type={'program'} />
                            </div>
                        </div>
                    </div> : null
            }


        </div >
    )
}