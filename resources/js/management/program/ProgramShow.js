import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useParams, Redirect } from 'react-router-dom';
import Pagination from '../components/Pagination';
import CoursesTable from '../components/CoursesTable';
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

                        <h4>???????????????? ?????? {program?.id}</h4>
                        <div>
                            <CustomModal buttonClass="btn btn-info mr-2" label={'?????? ???????????????? ???? ??????????????'} >
                                <div>
                                    ???? ?????? ???????? ?????? ???????????????? ???? ?????????? ???????? ????????????
                                </div>
                                <button className="btn btn-secondary" onClick={deleteProgram} data-dismiss="modal">??????</button>
                                <button className='btn btn-success' data-dismiss="modal">????</button>

                            </CustomModal>
                            <EditProgram program={program} />
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">

                        <div className="col-5 border border-dark rounded m-2 text-center">
                            ?????????? ???????????????? {program?.category}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            ???????????? ???????????????? {program?.details}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            ?????????? ???????????????? {program?.goals}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            ?????? ???????????????? ???????????? {program?.period} ??????????
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            ?????????? ???????????????? {program?.title}
                        </div>

                    </div>
                </div>

            </div>


            <div className="row justify-content-around">
                <div onClick={() => settoggleUI('documents')} className={"p-2 rounded " + (toggleUI == 'documents' ? 'bg-primary' : 'bg-light')}>??????????????????</div>
                <div onClick={() => settoggleUI('courses')} className={"p-2 rounded " + (toggleUI == 'courses' ? 'bg-primary' : 'bg-light')}>??????????</div>
                <div onClick={() => settoggleUI('notes')} className={"p-2 rounded " + (toggleUI == 'notes' ? 'bg-primary' : 'bg-light')}>??????????????</div>
            </div>

            {
                toggleUI == 'documents' ? <div className="card">
                    <div className="card-header d-flex flex-row justify-content-between">
                        <h4>?????????????????? ???????????? ??????????????????</h4>
                        <AllowedLink to={{
                            pathname: routes.attachDocument, state: { documentable: program, documentable_type: 'App\\Models\\TrainingProgram' }
                        }}>?????????? ?????????? ????????</AllowedLink>
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
                    <h4 className="card-header">
                        ?????????????? ???????? ???????? ????????????????
                    </h4>

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
                                <h4>?????????????? ?????? ????????????????</h4>
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