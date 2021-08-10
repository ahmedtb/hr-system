import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useParams, Link } from 'react-router-dom';
import Pagination from '../utility/Pagination';
import CoursesTable from '../partials/CoursesTable';
import routes from '../utility/routesEndpoints';
function RenderDocuments(props) {
    const documents = props.documents

    return (
        <>
            {
                documents?.map((document, index) => {
                    return (
                        <div className="row" key={index}>
                            <button data-toggle="modal" data-target="#documentModel">
                                <img key={index} src={"data:image/png;base64," + document.image} height="60" />
                            </button>

                            <div className="modal fade" id="documentModel" tabIndex="-1" aria-labelledby="documentModelLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="documentModelLabel">Modal title</h5>
                                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <img key={index} src={"data:image/png;base64," + document.image} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }

        </>

    )
}

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

    const [documents, setdocuments] = React.useState([])
    const [documentslinks, setdocumentslinks] = React.useState([])

    async function fetchdocuments(link = ApiEndpoints.documentIndex, params = { documentable_id: id, documentable_type: 'App\\Models\\TrainingProgram' }) {

        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setdocuments(response.data.data)
            console.log('fetchdocuments', response.data)
            if (response.data.links) { setdocumentslinks(response.data.links) } else setdocumentslinks(null)
        }).catch((error) => logError(error))
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
        fetchdocuments()
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    البرنامج رقم {program?.id}
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

            <div className="card">
                <div className="card-header">
                    المستندات الملحق بالبرنامج
                    <Link to={routes.attachDocument} >الحاق مستند جديد</Link>
                </div>

                <div className="card-body">
                    <div className="row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-right-circle col-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                        <RenderDocuments documents={documents} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle col-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                    </div>

                </div>
            </div >

            <div className="card">
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
            </div>


        </div >
    )
}